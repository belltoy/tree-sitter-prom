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
    source_file: $ => repeat($._line),

    _line: $ => choice(
      $.sample,
      $._comment_line,
      '\n'),

    _comment_line: $ => choice(
      $.help_line,
      $.type_line,
      $.comment,
    ),

    help_line: $ => seq(
      token("#"),
      token("HELP"),
      field("metric_name", $._metric_name),
      field("metric_help", $.docstring),
      '\n'
    ),

    type_line: $ => seq(
      token("#"),
      token("TYPE"),
      field("metric_name", $._metric_name),
      field("metric_type", $._metric_type),
      '\n'
    ),

    comment: $ => seq(token("#"), token(prec(-10, /[^\n]*/)), '\n'),

    _metric_type: $ => alias(
      choice("counter", "gauge", "histogram", "summary", "untyped"),
      $.type
    ),

    sample: $ => $.expression,

    expression: $ => seq(
      field("metric_name", $._metric_name),
      optional($.label_set),
      field("metric_value", $._metric_value),
      field("timestamp", optional($._timestamp)),
      '\n'
    ),

    _metric_name: $ => alias(/[a-zA-Z_:][a-zA-Z0-9_:]*/, $.identifier),

    label_set: $ => seq("{", optional(seq($.label, repeat(seq(",", $.label)), optional(","))), "}"),

    label: $ => seq(
      field("label_name", alias($._label_name, $.identifier)),
      "=",
      field("label_value", alias($._label_value, $.string)),
    ),

    _label_name: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    _label_value: $ => seq('"', /([^"\\\n]|\\["\\n])*/, '"'),

    _metric_value: $ => alias(choice(
      $._float_value,
      "NaN",
      "+Inf",
      "-Inf",
    ), $.number),

    // FIXME: Parse go's float literal
    // https://go.dev/ref/spec#Floating-point_literals
    _float_value: $ => /[+-]?([0-9]*[.])?[0-9]+([eE][+-]?[0-9]+)?/,

    // FIXME: Parse go's integer literal
    // https://go.dev/ref/spec#Integer_literals
    _timestamp: $ => alias(/[0-9]+/, $.number),

    docstring: $ => /([^\n\\]|\\[n\\])*/,
  }
});
