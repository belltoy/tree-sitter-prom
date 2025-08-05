package tree_sitter_prom_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_prom "github.com/belltoy/tree-sitter-prom.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_prom.Language())
	if language == nil {
		t.Errorf("Error loading Prometheus' text-based format grammar")
	}
}
