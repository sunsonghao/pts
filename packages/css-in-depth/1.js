/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-10-19 14:40:37
 * @LastEditors: sunsh
 * @LastEditTime: 2021-10-26 01:32:43
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
css的后期绑定late-binding 使一个样式表可以作用股多个网页，用户还可以直接改变渲染结果。

智能手机出现->响应式设计->css需要抽象性->相对单位的出现。
CSS会根据浏览器、操作系统、硬件适当的缩放，通常96px等于一物理英寸。

1.em
.padding { padding: 1em; }
1em浏览器将其乘以字号，最终渲染为16px。// 16px称为计算值
medium关键字的值是16px.

em同时用于字号和其他属性时的坑：字号继承值 X em单位，得到当前字号，再换算其他属性。
em用于嵌套的多级列表，会导致字号不一致。
em用在内边距、外边距以及元素大小上很好，但是用在字号上就会很复杂

2.rem
root em的缩写
:root 相当于 html选择器
拿不准的时候，用rem设置字号，用px设置边框，用em设置其他大部分属性。

// 反模式
html {
    font-size: .625em; //默认的16px缩小为10px, 反模式，像素化思维，不推荐
}
1）以上做法被迫写很多代码，10px太小，14px的地方都要写成1.4em,修改麻烦
2）还是像素化思维，写的1.4em,心里想的是14px.要习惯模糊值。

// 设置一个合理的默认字号：14px/16px = 0.875em;
// 缩放组件
.button {
    font-size: 1rem;
    padding: 1em;
    border: 1px solid red;
    border-radius: 0.5em;
}
.button h2 {
    font-size: 0.8em; // 字号相对于父级
    。。。
}
.button.large {
    font-size: 1.2rem; // 一行搞定缩放
}
button.small {
    font-size: 0.8rem;
}

3.视口相对单位vw、vh、vmim、vmax
用vw设置字号：元素能够在两种大小设备间平滑过渡。font-size: 2vw;
calc()定义字号可以让vw定义字号的极端情况更加缓和。iphone上字体可能变成7.5px太小。
calc()函数内可以对两个及其以上的值进行基本运算。当要结合不同单位的值时，calc()特别实用。
:root {
    font-size: calc(0.5em + 1vw); // 不用媒体查询就实现了大部分的响应式策略
}

/* :root {          （以下3行）作用到所有的屏幕，但是在大屏上会被覆盖
font-size: 0.75em;   
}                      

@media (min-width: 800px) {   （以下5行）仅作用到宽度800px及其以上的屏幕，覆盖之前的值
:root {                     
    font-size: 0.875em;       
}                           
}                             

@media (min-width: 1200px) {  （以下5行）仅作用到宽度1200px及其以上的屏幕，覆盖前面两个值
:root {                      
    font-size: 1em;           
}                            
} */

4.无单位数值和行高
一个无单位的0只能用于长度值和百分比，比如内边距、边框和宽度等，而不能用于角度值，比如度，或者时间相关的值
line-height(fontsize X 数值)它的值既可以有单位也可以无单位。

5.
自定义属性-css变量：--xxxx, var(var, copyValue),真正的意义在于能够层叠和继承，不是简单的变量复用，实时切换网站主题等

// 动态改变自定义属性
:root {
    --main-bg: #fff;      （以下2行）分别将背景色和文字颜色变量定义为白色和黑色
    --main-color: #000;   
  }
  
  .panel {
    font-size: 1rem;
    padding: 1em;
    border: 1px solid #999;
    border-radius: 0.5em;
    background-color: var(--main-bg);    （以下2行）在面板样式中使用变量
    color: var(--main-color);             
  }
  
  .panel > h2 {
    margin-top: 0;
    font-size: 0.8em;
    font-weight: bold;
    text-transform: uppercase;
  }
// 真正所在
  .dark {
    margin-top: 2em;   ←---- 给深色容器和前面的面板之间加上外边距
    padding: 1em;         
  
    background-color: #999;    ←---- 给深色容器加上深灰色背景
    --main-bg: #333;      （以下2行）在容器内重定义--main-bg和--main-color变量
    --main-color: #fff;    
  }


//   使用js改变自定义属性
let html = document.documentElement;
let styles = getComputedStyle(html); // styles对象
styles.getPropertyValue('--main-bg); // ←-- 获取styles对象的--main-bg值
或者 利用这种技术，就可以用JavaScript实时切换网站主题，或者在网页中突出显示某些元素，或者实时改变任意多个元素
html.style.setProperty('--main-bg', '#cdf');  ←---- 将根元素上的--main-bg设置为浅蓝色

// 拥抱相对单位，让网页的结构决定样式的含义。
// 建议用rem设置字号，但是有选择地用em实现网页组件的简单缩放。
// 不用媒体查询也能让整个网页响应式缩放。
// 使用无单位的值设置行高。
// 请开始熟悉CSS的一个新特性：自定义属性。



/* 第3章 盒模型 */

`;