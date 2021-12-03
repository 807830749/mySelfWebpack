const fs = require("fs")
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const path = require("path")
const { transformFromAst } = require("@babel/core")
module.exports = class webpack {
  constructor(options) {
		const {entry, output} = options
		this.entry = entry
		this.output = output
		this.modules = []
	}
	run() {
		// 入口函数
		const info = this.parse(this.entry)
		this.modules.push(info)
		// 用双层for循环实现递归效果
		for(const i of this.modules) {
			if(i.yilai) {
				for(const j in i.yilai) {
					this.modules.push(this.parse(i.yilai[j]))
				}
			}
		}
		// 数据格式转换 arr to obj
		const obj = {}
		this.modules.map((el) => {
			obj[el.entryFile] = {
				yilai: el.yilai,
				code: el.code
			}
		})
		this.file(obj)
	}
	parse(entryFile) {
		// 解析模块
		const content = fs.readFileSync(entryFile, "utf-8")
		const ast = parser.parse(content, {
			sourceType: "module"
		})
		const yilai = {}
		traverse(ast, {
			ImportDeclaration({node}) {
				yilai[node.source.value] = path.resolve(path.dirname(entryFile), node.source.value)
			}
		})
		const { code } = transformFromAst(ast, null, {
			presets: ["@babel/preset-env"]
		})
		return {
			entryFile,
			yilai,
			code
		}
	}
	file(obj) {
		// 1. 生成bundle文件(需要从output字段拿到文件的存储位置和文件名称)
		const bundlepath = path.join(this.output.path, this.output.filename)
		const newobj = JSON.stringify(obj)
		const content = `(function(modules){
			function require(module) {
				function newrequire(relativepath) {
					return require(modules[module].yilai[relativepath])
				}
				(function(require, code){
					eval(code)
				})(newrequire,modules[module].code)
			}
			require(${this.entry})
		})(${newobj})`
		fs.writeFileSync(bundlepath, content, "utf-8")
	}
}