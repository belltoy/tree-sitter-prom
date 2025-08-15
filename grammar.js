/**
 * @file Prometheus's text-based format
 * @author Zhongqiu Zhao <belltoy@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "prom",

  extras: ($) => [' '],

  rules: {
    source_file: $ => repeat(seq(optional($._line), '\n')),

    _line: $ => choice($.metric_line, $._comment_line),

    _comment_line: $ => choice(
      $.help_line,
      $.type_line,
      $.comment,
    ),

    help_line: $ => seq(token("#"), token("HELP"), $.metric_name, $.metric_help),

    type_line: $ => seq(token("#"), token("TYPE"), $.metric_name, $.metric_type),

    comment: $ => seq(token("#"), token(prec(-10, /[^\n]*/))),

    metric_type: $ => choice("counter", "gauge", "histogram", "summary", "untyped"),

    metric_help: $ => /[^\n]*/,

    metric_line: $ => seq($.metric_name, optional($.label_set), $.metric_value, optional($.timestamp)),

    metric_name: $ => /[a-zA-Z_:][a-zA-Z0-9_:]*/,

    label_set: $ => seq("{", optional(seq($.label, repeat(seq(",", $.label)), optional(","))), "}"),

    label: $ => seq($.label_name, "=", '"', $.label_value, '"'),

    label_name: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    label_value: $ => /([^"\\]|\\.)*/,

    metric_value: $ => choice(
      $._float_value,
      "NaN",
      "+Inf",
      "-Inf",
    ),

    // FIXME: Parse go's float literal
    // https://go.dev/ref/spec#Floating-point_literals
    _float_value: $ => /[+-]?([0-9]*[.])?[0-9]+([eE][+-]?[0-9]+)?/,

    // FIXME: Parse go's integer literal
    // https://go.dev/ref/spec#Integer_literals
    timestamp: $ => /[0-9]+/,
  }
});
