[
  (comment)
  (type_line)
  (help_line)
] @comment

[
  "TYPE"
  "HELP"
] @keyword

(metric_type) @type.builtin

(metric_name) @variable

(label_name) @label

((label_name) @attribute.builtin
 (#eq? @attribute.builtin "le"))

(label_value) @string

(metric_value) @number.float

(timestamp) @number

[ "{" "}"] @punctuation.bracket

[ "=" ] @operator

[ "," ] @punctuation.comma
