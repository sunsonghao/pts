/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-10-19 14:40:37
 * @LastEditors: sunsh
 * @LastEditTime: 2021-10-27 19:47:12
 */
cont NOTE = `
/* ------------------------第一章 层叠、优先级和继承------------------------ */
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

// 简写的属性中省略的值会设置为默认值。
// 控制选择器的优先级。
// 不要混淆层叠和继承。
// 某些属性会被继承，包括文本、列表、表格边框相关的属性。
// 不要混淆initial和auto值。
// 简写属性要注意TRouBLe的顺序，避免踩坑



/* ------------------------第二章 相对单位------------------------ */
// https://zhuanlan.zhihu.com/p/44553199 你真的了解css像素吗？
css的后期绑定late-binding 使一个样式表可以作用股多个网页，用户还可以直接改变渲染结果。

智能手机出现->响应式设计->css需要抽象性->相对单位的出现。
CSS会根据浏览器、操作系统、硬件适当的缩放，通常96px等于一物理英寸。

1.em
.padding { padding: 1em; }
1em浏览器将其乘以字号，最终渲染为16px。// 16px称为计算值
medium关键字的值是16px.(浏览器设置的fontsize)

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



/* ------------------------第3章 盒模型------------------------ */
#0090c9
http://howtocenterincss.com/, 垂直居中
1.容器的宽度
main {
    displya: block; 修复IE的bug,IE会默认将<main>元素渲染成行内元素，而不是块级元素
}

// 全局border-box, 参考css中的‘全局border-box’

em做列的间隔，em的一致性更好
.em {
    width: calc(70% - 1em);
    mairgin-right: 1em; /* 意图更加明确，从70%中来 */
}

2.元素高度问题
普通文档流是为限定的宽度和 无限的 高度设计的
// 控制溢出
over-flow: scroll; // 在一些操作系统上不溢出也会会出现滚动条，置灰的滚动条。

// 高度百分比备选
用百分比指定高度存在问题：百分比参考的是元素容器块的大小，但是容器的高度通常是由子元素的高度决定的。这样会造成死循环，浏览器处理不了，因此它会忽略这个声明。要想让百分比高度生效，必须给父元素明确定义一个高度

等高列, 是列不是行
表格、伪元素、负外边距，现代浏览器支持css表格：IE8+支持display: table，IE10+支持弹性盒子或者Flexbox，都默认支持等高列
如果IE10+支持某特性，那么基本上所有长青浏览器都支持该特性。
.css-table { // 参看css文件
    display: table;
    & > * {
        display: table-cell;
    }
}
css无法实现表格的colspan, rowspan. <table>布局，无语义的标签，承担css本该承受的任务。

IE9不支持flexbox

// 垂直居中
vertical-align声明只会影响行内元素或者table-cell元素,不支持块级元素。
vertical-align对于行内元素，它控制着该元素跟同一行内其他元素之间的对齐关系。比如，可以用它控制一个行内的图片跟相邻的文字对齐。

垂直居中指南：
在容器里让内容居中最好的方式是根据特定场景考虑不同因素。做出判断前，先逐个询问自己以下几个问题，直到找到合适的解决办法。其中一些技术会在后面的章节中介绍，可根据情况翻阅对应的内容寻找答案。
    可以用一个自然高度的容器吗？给容器加上相等的上下内边距让内容居中。
    容器需要指定高度或者避免使用内边距吗？对容器使用display: table-cell和vertical-align: middle。
    可以用Flexbox吗？ 如果不需要支持IE9，可以用Flexbox居中内容。参见第5章。
    容器里面的内容只有一行文字吗？设置一个大的行高，让它等于理想的容器高度。这样会让容器高度扩展到能够容纳行高。如果内容不是行内元素，可以设置为inline-block。
    容器和内容的高度都知道吗？将内容绝对定位。参见第7章。（只有当前面提到的方法都无效时才推荐这种方式。）
    不知道内部元素的高度？用绝对定位结合变形（transform）。参见第15章的例子。（还是只有当前面提到的方法都无效时才推荐该方法。）
还不确定的话，参考howtocenterincss网站。这个网站很不错，可以根据自己的场景填写几个选项，然后它会相应地生成垂直居中的代码。


// 负外边距
设置左边或顶部的负外边距，元素就会相应地向左或向上移动，导致元素与它前面的元素重叠，
设置右边或者底部的负外边距，并不会移动元素，而是将它后面的元素拉过来。
给元素底部加上负外边距并不等同于给它下面的元素顶部加上负外边距。

如果元素被别的元素遮挡， 利用负外边距让元素重叠的做法可能导致元素不可点击。

// 外边距折叠
只有上下外边距会折叠，左右外边距不会折叠。
防止折叠的方法：
    对容器使用overflow: auto（或者非visible的值），防止内部元素的外边距跟容器外部的外边距折叠。这种方式副作用最小。
    在两个外边距之间加上边框或者内边距，防止它们折叠。
    如果容器为浮动元素、内联块、绝对定位或固定定位时，外边距不会在它外面折叠。
    当使用Flexbox布局时，弹性布局内的元素之间不会发生外边距折叠。网格布局（参见第6章）同理。
    当元素显示为table-cell时不具备外边距属性，因此它们不会折叠。此外还有table-row和大部分其他表格显示类型，但不包括table、table-inline、table-caption。

// 容器内元素间距
ul {
    padding: 1em;
    & > li {
        margin-top: 1em; // 导致第一个元素跟容器ul之间的空白为2em.
    }
}
解决以上空白过大：
li + li {
    margin-top: 1em;
}
优化：
body * + * { owl猫头鹰选择器，参见css中owl-selector
    margin-top: 1em;
}

总结：
总是全局设置border-box，以便得到预期的元素大小。
避免明确设置元素的高度，以免出现溢出问题。
使用现代的布局技术，比如display: table或者Flexbox实现列等高或者垂直居中内容。
如果外边距的行为很奇怪，就采取措施防止外边距折叠。
使用猫头鹰选择器全局设置堆叠元素之间的外边距。


























































































`;