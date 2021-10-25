/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-10-19 14:40:37
 * @LastEditors: sunsh
 * @LastEditTime: 2021-10-25 19:37:22
 */
cont NOTE = `
/* 第一章 层叠、优先级和继承 */
1.层叠
// 规则集
.inline-block {
    color: black; // 声明，属性：值
}
@规则（at-rules）是指用“@”符号开头的语法。比如@import规则或者@media查询

css规则集相互冲突，就产生了层叠。
层叠解决冲突的三个条件：
    1.样式表的来源: user-agent < 用户样式表(少见，不受网站作者的控制，用的少) < 作者样式（自己写的样式）
        |   user-agent不同浏览器做大题相同的事情：为<h1>到<h6>、<p>添加上下外边距，为列表（<ol>和<ul>）添加左侧内边距，为链接添加颜色，为元素设置各种默认字号。
        V   
    2.选择器的优先级
        |   分为2部分：html行内样式、选择器优先级
        V   选择器优先级： id选择器数量多 > 类选择器多的（包括伪类选择器和属性选择器[type='input']） > 标签选择器多的
            通用选择器（*）和组合器（>、+、~）对优先级没有影响
    3.规则集书写的先后顺序

经验之谈：减少ID选择器和!important的使用，没有优先级更高的选择器叠加。用于发布的包，尽量不要在js中附加css,逼迫用户全盘接受你的样式。

2.继承
默认情况下，只有特定的一些属性能被继承，通常是我们希望被继承的那些。它们主要是跟文本相关的属性，还有一些如列表属性：list-style、list-style-type、list-style-position以及list-style-image。表格的边框属性border-collapse和border-spacing也能被继承。

特殊值：
inherit, 替代一个层叠值。还可以强制继承一个通常不会继承的属性：border、padding.
    a {
        color: blue;
    }
    .nav {
        color: grey;
        a {
            color: inherit;
        }
    }
initial, 重置为默认值，通常用于撤销一个样式。auto,normal不是通用值，是个别属性的默认值。display的默认值是inline.
简写的属性中省略的值会设置为默认值。



/* 第二章 相对单位 */
// https://zhuanlan.zhihu.com/p/44553199 你真的了解css像素吗？

em的副作用,用在字号上很难驾驭了font-size:.8em, 是相对父级字体大小x0.8，解决 ul ul { font-size: .8em;}
解决：rem： root em的缩写

:root 相当于 html选择器

拿不准的时候，用rem设置字号，用px设置边框，用em设置其他大部分属性。

calc

line-height

自定义属性-css变量：--xxxx, var(var, copyValue),真正的意义在于层叠和继承，实时切换网站主题等

`;