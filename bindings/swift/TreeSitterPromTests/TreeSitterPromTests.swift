import XCTest
import SwiftTreeSitter
import TreeSitterProm

final class TreeSitterPromTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_prom())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Prometheus' text-based format grammar")
    }
}
