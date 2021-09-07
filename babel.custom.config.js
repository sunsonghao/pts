/*
 * @Description: 如果改为monorepo类型固定名字：babel.config.js, 可能导致babel直接加载改文件。由于使用gulp-babel, 这里只是把配置提出来，无需和babel.config.js重名。
 * @Author: sunsh
 * @Date: 2021-08-26 10:35:25
 * @LastEditors: sunsh
 * @LastEditTime: 2021-09-07 10:36:33
 */
module.exports = function(api) {
    api.cache(true);

    return {
        "sourceType": "script",
        "presets": [
            ["@babel/preset-env", {
                // modules: false
                // 需要bundle工具的支持
                // "useBuiltIns": "usage",
                // "corejs": { version: "3.16.3", proposals: true }
            }]
        ],
        "assumptions": {
            "setPublicClassFields": true
        },
        "plugins": [
            ["@babel/plugin-transform-modules-commonjs", {"strictMode": false}], // in preset-env
            "@babel/plugin-proposal-function-bind",
            ["@babel/plugin-proposal-decorators", {"legacy": true }],
            ["@babel/plugin-proposal-class-properties"] // in preset-env
        ]
    }
}