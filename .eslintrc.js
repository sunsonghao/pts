module.exports = {
    "rules": {
		"no-console": 0,  //禁用 console
        "no-mixed-spaces-and-tabs": 0,  //禁止空格和 tab 的混合缩进
        "no-debugger":  0,   //禁用 debugger
        "no-cond-assign": 0,  //禁止条件表达式中出现赋值操作符
        "no-sparse-arrays": 0,  //禁用稀疏数组
        "no-dupe-keys": 2,  //禁止对象字面量中出现重复的 key
        "no-dupe-args": 2,  //禁止 function 定义中出现重名参数
        "no-duplicate-case": 0,  //禁止出现重复的 case 标签
        "no-empty-character-class": 0,  //禁止在正则表达式中使用空字符集
        "no-empty": 0,  //禁止出现空语句块
        "no-ex-assign": 2,  //禁止对 catch 子句的参数重新赋值
        "no-extra-boolean-cast": 0,  //禁止不必要的布尔转换
        "no-extra-parens:": 0,  //禁止不必要的括号
        "no-extra-semi": 0,  //禁止不必要的分号
        "no-func-assign": 2,  //禁止对 function 声明重新赋值
        "no-inner-declarations": 0,  //禁止在嵌套的块中出现变量声明或 function 声明
        "no-invalid-regexp": 2,  //禁止 RegExp 构造函数中存在无效的正则表达式字符串
        "no-irregular-whitespace": 0,  //禁止在字符串和注释之外不规则的空白
        "no-obj-calls": 0,  //禁止把全局对象作为函数调用
        "no-prototype-builtins": 0,  //禁止直接调用 Object.prototypes 的内置属性
        "no-regex-spaces": 2,  //禁止正则表达式字面量中出现多个空格
        "no-unexpected-multiline": 1,   //禁止出现令人困惑的多行表达式
        "no-unreachable": 0,   //禁止在return、throw、continue 和 break 语句之后出现不可达代码
        "no-unsafe-finally": 0,   //禁止在 finally 语句块中出现控制流语句
        "use-isnan": 0,   //要求使用 isNaN() 检查 NaN
        "valid-jsdoc": 0,   //强制使用有效的 JSDoc 注释
        "valid-typeof": 0,  //强制 typeof 表达式与有效的字符串进行比较
        "block-scoped-var": 0,  //强制把变量的使用限制在其定义的作用域范围内
        "consistent-return": 0,  //要求 return 语句要么总是指定返回的值，要么不指定
        "default-case": 0,  //要求 switch 语句中有 default 分支
        "no-empty-function": 0,  //禁止出现空函数
        "no-empty-pattern": 1,  //禁止使用空解构模式
        "no-invalid-this": 2,  //禁止 this 关键字出现在类和类对象之外
        "no-lone-blocks": 1,  //禁用不必要的嵌套块
        "no-loop-func": 0,  //禁止在循环中出现 function 声明和表达式
        "no-new": 0,  //禁止在非赋值或条件语句中使用 new 操作符
        "no-return-assign": 0,  //禁止在 return 语句中使用赋值语句
        "no-void": 0, //禁用 void 操作符
        "no-unused-labels": 1,  //禁用出现未使用过的标
        "no-with": 2,  //禁用 with 语句
        "no-use-before-define": 0,  //禁止在变量定义之前使用它们
        "no-unused-vars": 0,  //禁止出现未使用过的变量
        "handle-callback-err": 0,  //要求回调函数中有容错处理
        "arrow-body-style": 0, //要求箭头函数体使用大括号
        "arrow-parens": 2,  //要求箭头函数的参数使用圆括号
        "no-class-assign": 2,  //禁止修改类声明的变量
        "no-confusing-arrow": 1,  //disallow arrow functions where they could be confused with comparisons
        "no-const-assign": 2,  //禁止修改 const 声明的变量
        "no-dupe-class-members": 2,  //禁止类成员中出现重复的名称
        "no-new-symbol": 1,  //disallow new operators with the Symbol object
        "no-this-before-super": 2,  //禁止在构造函数中，在调用 super() 之前使用 this 或 super
        "no-useless-computed-key": 1,  //禁止不必要的计算属性在对象中
        "no-useless-constructor": 1,  //禁用不必要的构造函数
        "no-useless-rename": 2,  //disallow renaming import, export, and destructured assignments to the same name
        "prefer-const": 0,  //要求使用 const 声明那些声明后不再被修改的变量
        "prefer-numeric-literals": 2,  //不允许使用parseInt()来转化二进制，八进制,十六进制
        "no-case-declarations": 0,  //不允许在 case 子句中使用词法声明
        "no-fallthrough": 0,  //禁止 case 语句落空
        "eqeqeq": 0,
        "arrow-parens": 0,
        //  https://eslint.org/docs/rules/no-invalid-this
		"no-invalid-this": 0,
		"no-lone-blocks": 0,  //禁止不必要的嵌套块 
        "no-useless-escape": 0,
        "no-self-assign": 0, // 变量赋值给自己 a = a;
        "no-undef": 0
    },
	"ecmaFeatures": {
        // lambda表达式
        "arrowFunctions": true,
        // 解构赋值
        "destructuring": true,
        // class
        "classes": true,
        // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值
        "defaultParams": true,
        // 块级作用域，允许使用let const
        "blockBindings": true,
        // 允许使用模块，模块内默认严格模式
        "modules": true,
        // 允许字面量定义对象时，用表达式做属性名
        // http://es6.ruanyifeng.com/#docs/object#属性名表达式
        "objectLiteralComputedProperties": true,
        "objectLiteralShorthandProperties": true,
        // http://es6.ruanyifeng.com/#docs/function#rest参数
        "restParams": true,
        // http://es6.ruanyifeng.com/#docs/function#扩展运算符
        "spread": true,
        // http://es6.ruanyifeng.com/#docs/iterator#for---of循环
        "forOf": true,
        // http://es6.ruanyifeng.com/#docs/generator
        "generators": true,
        // http://es6.ruanyifeng.com/#docs/string#模板字符串
        "templateStrings": true,
        "superInFunctions": true,
        // http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符
        "experimentalObjectRestSpread": true,
        "objectLiteralShorthandMethods": true
    },
    "globals": {
		"_": true,
        "$": true,
        "jQuery": true,
        "Backbone": true,
        "seajs": true,
        "define": true,
        "AMap": true, //高德地图
        "FS": true,
		"CRM2K": true,
        "Zclip": true,
        "scheduler": true,
        "dhtmlXScheduler": true,
        "require": true,
        'Vue':true,
		'$t': true,
		'CRM': true,
		'FxUI': true,
		'PRM': true,
        'VCRM': true,
        'PAAS': true,
		'Fx':  true
    },
    "env": {
		"browser": true,
        "node": true,
        "commonjs": true,
        "jquery": true,
        "amd": true,
        "qunit": true,
        "shared-node-browser":true,
        "shelljs": true,
        "es6": true,
    },
    'extends': 'eslint:recommended',

    "parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module",
		"ecmaVersion": 'latest',
        "requireConfigFile": true, // 为了支持proposal语法，改为true,需要明确babel配置文件名字，跟@babel/eslint-parse有关
        "babelOptions": {
            "configFile": "./babel.custom.config.js",
        },
},
    "parser": "@babel/eslint-parser",
};
