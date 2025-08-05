[
  (comment)
  (type_line)
  (help_line)
] @comment

[
  "TYPE"
  "HELP"
] @keyword

(metric_type) @type

(metric_name) @variable

(label_name) @label

(label_value) @string

(metric_value) @number.float

(timestamp) @number

[ "{" "}"] @punctuation.bracket

[ "=" ] @operator

[ "," ] @punctuation.comma
