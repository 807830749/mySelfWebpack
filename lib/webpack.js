const fs = require("fs")
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
module.exports = class webpack {
  constructor(options) {
		const {entry, output} = options
		this.entry = entry
		this.output = output
	}
	run() {
		// 入口函数
		this.parse(this.entry)
	}
	parse(entryFile) {
		// 解析模块
		const content = fs.readFileSync(entryFile, "utf-8")
		const ast = parser.parse(content, {
			sourceType: "module"
		})
		traverse(ast, {
			ImportDeclaration({node}) {
				console.log(node.source.value)
			}
		})
		// console.log(ast.program.body)
	}
}