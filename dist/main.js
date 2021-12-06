(function(modules){
			function require(module) {
				function newrequire(relativepath) {
					return require(modules[module].yilai[relativepath])
				}
				const exports = {};
				(function(exports, require, code){
					eval(code)
				})(exports, newrequire, modules[module].code)
				return exports;
			}
			require('./src/index.js')
		})({"./src/index.js":{"yilai":{"./a.js":"D:\\wdx\\mySelfWebpack\\src\\a.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nconsole.log(\"hello \".concat(_a.a, \" webpack\"));"},"D:\\wdx\\mySelfWebpack\\src\\a.js":{"yilai":{"./b.js":"D:\\wdx\\mySelfWebpack\\src\\b.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\n\nvar _b = require(\"./b.js\");\n\nvar a = \"kkb\" + _b.b;\nexports.a = a;"},"D:\\wdx\\mySelfWebpack\\src\\b.js":{"yilai":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\nvar b = \"bbb\";\nexports.b = b;"}})