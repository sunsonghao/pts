/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-10-19 14:40:37
 * @LastEditors: sunsh
 * @LastEditTime: 2021-11-03 19:34:24
 */
cont NOTE = `
/* -----------------------------------------------------------第一部分 基础----------------------------------------------------------- */

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

/*intrinsic&extrinsic https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/ */
/* https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout */
// 好好理解下table的各种特性
.css-table { // 参看css文件
    display: table;
    width: 100%;
    table-layout: fixed;
    & > * {
        display: table-cell;
    }
}
css无法实现表格的colspan, rowspan. <table>布局，无语义的标签，承担css本该承受的任务。

IE9不支持flexbox

// 垂直居中
vertical-align声明只会影响行内inline元素或者table-cell元素,不支持块级元素。
vertical-align对于行内元素，它控制着该元素跟同一行内其他元素之间的对齐关系。比如，可以用它控制一个行内的图片跟相邻的文字对齐。

垂直居中指南：
在容器里让内容居中最好的方式是根据特定场景考虑不同因素。做出判断前，先逐个询问自己以下几个问题，直到找到合适的解决办法。其中一些技术会在后面的章节中介绍，可根据情况翻阅对应的内容寻找答案。
    可以用一个自然高度的容器吗？给容器加上相等的上下内边距让内容居中。
    容器需要指定高度或者避免使用内边距吗？对容器使用display: table-cell（width:min-content;）和vertical-align: middle。
    可以用Flexbox吗？ 如果不需要支持IE9，可以用Flexbox居中内容。参见第5章。
    容器里面的内容只有一行文字吗？设置一个大的行高，让它等于理想的容器高度。这样会让容器高度扩展到能够容纳行高。如果内容不是行内元素，可以设置为inline-block。
    容器和内容的高度都知道吗？将内容绝对定位。参见第7章。（只有当前面提到的方法都无效时才推荐这种方式。）
    不知道内部元素的高度？用绝对定位结合变形（transform）。参见第15章的例子。（还是只有当前面提到的方法都无效时才推荐该方法。）
还不确定的话，参考howtocenterincss网站。这个网站很不错，可以根据自己的场景填写几个选项，然后它会相应地生成垂直居中的代码。


// 负外边距
设置左边或顶部的负外边距，元素就会相应地向左或向上移动，导致元素与它前面的元素重叠，
设置右边或者底部的负外边距，并不会移动元素，而是将它后面的元素拉过来。（会压着前面的元素）
给元素底部加上负外边距并不等同于给它下面的元素顶部加上负外边距。

如果元素被别的元素遮挡， 利用负外边距让元素重叠的做法可能导致元素不可点击。

// 外边距折叠
当顶部和/或底部的外边距相邻时，就会重叠，产生单个外边距。这种现象被称作折叠.
折叠外边距的大小等于相邻外边距中的最大值。
即使两个元素不是相邻的兄弟节点也会产生外边距折叠。即使将这个段落用一个额外的div包裹起来，

总之，所有相邻的顶部和底部外边距会折叠到一起。如果在页面中添加一个  空的、无样式的div （没有高度、边框和内边距），它自己的顶部和底部外边距就会折叠。
// 参见.empty元素，上下margin折叠，使得下部元素上移。

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




/* -----------------------------------------------------------第二部分 精通布局----------------------------------------------------------- */
CSS控制网页布局：浮动、Flexbox和定位。他们本身没有优劣之分，只是实现布局的方式略有不同

/* ------------------------第4章 理解浮动------------------------ */
1.浮动的设计初衷
浮动能将一个元素（通常是一张图片）拉到其容器的一侧，这样文档流就能够包围它。（报纸和杂志中比较常见）
浮动是为了实现文字围绕浮动元素排列的效果.
要支持IE、旧代码库、将图片移到网页的一侧，浮动仍是唯一的方法。

2.浮动父级折叠和清浮动
清浮动， 见css
清浮动改进版, 见css改进版

3.浮动陷进
浮动的特性导致元素高度  不一致 时排序是1243，解决：在已知每行几个元素的情况下可以给每行的第一个元素清楚上面的浮动。见css中浮动陷阱

4. 媒体对象和BFC(BLOCK FORMATTING CONTEXT)
媒体对象：图片在一侧，一段文字出现在图片的旁边的布局。

审查.float-help元素，延伸到了.float元素的下面，但是内容没有被遮挡。如何让文字在右边不在下面显示？只要清除了.float底部的浮动,给.float-help clear:left,但会导致float-heip新行开始。
但想要float-help在右边显示，如何实现呢？BFC

BFC:是网页的一块区域，元素基于这块区域布局。虽然BFC本身是环绕文档流的一部分，但它将内部的内容与外部的上下文隔离开。这种隔离为创建BFC的元素做了以下事情：
(1) 包含了内部所有元素的上下外边距。它们不会跟BFC外面的元素产生外边距折叠。
(2) 包含了内部所有的浮动元素。
(3) 不会跟BFC外面的浮动元素重叠。
简而言之，BFC里的内容不会跟外部的元素重叠或者相互影响。如果给元素增加clear属性，它只会清除自身所在BFC内的浮动。如果强制给一个元素生成一个新的BFC，它不会跟其他BFC重叠。

给元素添加以下的任意属性值都会创建BFC。
float： left或right，不为none即可。 // 使用浮动或者inline-block方式创建BFC的元素宽度会变成100%。因此要限制float-help宽度。
overflow：hidden、auto或scroll，不为visible即可。// 常用
display：inline-block、table-cell、table-caption、flex、inline-flex、grid或inline-grid。拥有这些属性的元素称为块级容器（block container）。// 使用table-cell方式显示的元素，其宽度只会刚好容纳其中的内容
position：absolute或position: fixed。
网页的根元素也创建了一个顶级的BFC。

5.网格系统
提高css的复用, 参见css中‘利用float实现的网格系统’

总结：
    浮动的设计初衷是让文字围绕一个元素排列，但有时这种效果并不是我们想要的。
    使用清除浮动来包含浮动元素。
    BFC有3个好处：包含浮动元素，防止外边距折叠，防止文档流围绕浮动元素排列。
    使用双容器模式让页面内容居中。
    使用媒体对象模式将描述文字定位到图片旁边。
    使用网格系统实现更丰富的网页布局。



/* ------------------------第5章 Flexbox------------------------ */
弹性盒子布局（Flexible Box Layout）
// Autoprefixer 添加css前缀
行内元素，给父元素贡献的高度会根据行高计算，而不是根据内边距和内容。

1.更棒的是，Flexbox允许使用margin: auto来填充弹性 子元素之间 的可用空间; 见css flex布局
2.弹性子元素的大小
flex-basis: 定义项目的基准大小（初始main-siz）,即 在分配多余空间前 的占主轴的main-size。
    flex-basis: auto; // 自动尺寸，main-size成了“参照我的width,height属性”，如果没有width则用元素自身内容大小。
    flex-basis: 非auto， 同时设置了width(主轴column, height), 那么flex-basis优先级更高，即忽略width。
    每个弹性子元素的 初始主尺寸确定 后，浏览器根据这个属性，计算主轴是否有多余空间。它们可能需要在主轴方向扩大或者缩小来适应（或者填充）弹性容器的大小。这时候就需要flex-grow和flex-shrink来决定缩放的规则。

flex简写的不同：
与大部分简写属性不一样，如果在flex中忽略某个子属性，那么子属性的值并不会被置为初始值（0 1 auto）。相反，如果某个子属性被省略，那么flex简写属性会给出有用的默认值：flex-grow为1、flex-shrink为1、flex-basis为0%。
这些默认值正是大多数情况下所需要的值。可以在浏览器查看元素的computed面板中查看。

flex-grow: 0; // 宽度不会超过flex-basis的值, 前提是内容宽度不会超过basis,否则由内容撑开。
flex-shrink,
flex: none(0 0 auto), auto(1 1 auto)， 默认0 1 auto, 不写的按1 1 0%补充。

// 参见css, 设置完flex后设置width:0(小于basis的值)防止文字溢出，或者设置max-width。

3. 对齐、间距
align-content
如果开启了flex-wrap，align-content就会控制弹性子元素在副轴上的间距。如果子元素没有换行，就会忽略align-content

order
整数，将弹性子元素从兄弟节点中移动到指定位置，覆盖源码顺序。谨慎使用：Tab键浏览元素的顺序与源码保持一致。

4.flex需要注意的地方
Flex兼容性问题见flexbugs: https://github.com/philipwalton/flexbugs
整页布局
《Don't use flexbox for overall page layout》
一行多列会出现问题，一列多行没问题（flex-direction:column;）

总结：
    使用Flexbox实现灵活易操作的网页内容布局。
    Autoprefixer可以简化Flexbox对旧版浏览器的支持。
    使用flex指定任何能想到的弹性子元素大小的组合。
    使用嵌套的弹性盒子来组成复杂的布局，以及填满自适应大小的盒子的高度。
    Flexbox自动地创建等高的列。
    使用align-items和align-self让一个弹性子元素在弹性容器中垂直居中。




/* ------------------------第6章 网格布局------------------------ */
网格布局模块（Grid Layout Module）
https://gridbyexample.com/ ,网格例子
1.浏览器厂商采用了全新的方式处理网格布局。它们不再用浏览器前缀方式，用户必须明确地开启这项特性才能使用。
display: grid;

2.网格剖析
四个概念弄清楚：
    grid-line, 
    网格轨道grid-track：某一整行/列,
    网格单元grid-cell, 
    grid-area：行开始线/列开始线/行结束线/列结束线组成的区域
见css grid-container

Flexbox本质上是一维的，而网格是二维的。
Flexbox是以内容为切入点由内向外工作的，而网格是以布局为切入点从外向内工作的。
实践经验：
当设计要求元素在两个维度上都对齐时，使用网格。当只关心一维的元素排列时，使用Flexbox。在实践中，这通常（并非总是）意味着网格更适合用于整体的网页布局，
而Flexbox更适合对网格区域内的特定元素布局。继续用网格和Flexbox，你就会对不同情况下该用哪种布局方式得心应手。

3.替代语法
①命名网格线
grid-template-columns: [left-start] 2fr
                       [left-end right-start] 1fr
                       [right-end];
在这条声明里，2号网格线既叫作left-end也叫作right-start，之后可以任选一个名称使用。这里还有一个彩蛋：将网格线命名为left-start和left-end，就定义了一个叫作left的区域，
这个区域覆盖两个网格线之间的区域。-start和-end后缀作为关键字，定义了两者之间的区域。如果给元素设置grid-column: left，它就会跨越从left-start到left-end的区域。

②命名网格区域
以下配合grid-area使用。
grid-template-areas: "top  top    right"
                     "left .      right"
                     "left bottom bottom";
解释：使用一种ASCII art的语法，直接在CSS中画一个可视化的网格形象。该声明给出了一系列加引号字符串，每一个字符串代表网格的一行，字符串内用空格区分每一列。
注意：每个命名的网格区域（以上中的left,bottom等）必须组成一个矩形。不能创造更复杂的形状，比如L或者U型。
用句点（.）作为名称，这样便能空出一个网格单元。比如，代码定义了四个网格区域，中间围绕着一个空的网格单元。

网格布局共设计了三种语法：
    编号的网格线、命名的网格线、命名的网格区域。
    命名的网格区域看着更爽。

4.显式和隐式网格
使用grid-template-* 属性定义网格轨道时，创建的是显式网格（explicit grid）;

// 图片瀑布流，控制列不控制行
从数据库获取时，元素的个数可能是未知的。此时，以一种宽松的方式定义网格，剩下的交给布局算法来放置网格元素，用到隐式网格（implicit grid）。
将元素放在显示网格外，此时会创建隐式轨道扩展显式网格。如：html中‘我是来串门的，额外加的’元素。

隐式网格轨道默认大小为auto，也就是它们会扩展到能容纳网格元素内容。可以给网格容器设置grid-auto-columns和grid-auto-rows，为隐式网格轨道指定一个大小（比如，grid-auto-columns: 1fr）。
注意：在指定网格线的时候，隐式网格轨道不会改变负数的含义。负的网格线编号仍然是从显式网格的右下开始的。
grid-auto-rows/columns/flow,

// 子网格，subgrid, 在grid level2规范中。
img标签的object-fit：fill, cover, contain属性，参考https://css-tricks.com/on-object-fit-and-object-position/

5.特性查询@support, @rules
@supports [not] (display: grid) {
    ...
}
@supports (mix-blend-mode: overlay) 来查询是否支持混合模式
ie不支持@support
@supports (display: grid) or|and (display: -ms-grid)

6.对齐方式
查看HTML中的图片
水平对齐：justify-content, justify-items,justify-self
垂直对齐：align-content, align-items,align-self
justify: space-evenly——将空间分配到每个网格轨道之间，且在两端各加上 同等大小 的间距（Flexbox规范不支持）。|s B s(ss) B s(ss) B s |
justify: space-around——将空间分配到每个网格轨道之间，且在两端各加上一半的间距。 |s B s(s) B s(s) B s |
         space-between——|s B s B s B s |
https://gridbyexample.com/ grid by example

总结：网格特别适合做网页整体布局（但不局限于此）。
     网格可以与Flexbox配合实现完整的布局系统。
     可以根据自己的喜好和特定场景，随意使用不同的语法（编号的网格线、命名的网格线、命名的网格区域）。
     可以用auto-fill / auto-fit以及隐式网格，对大量或者数量未知的网格元素进行布局。
     可以用特性查询实现渐进增强。




/* ------------------------第7章 定位和层叠上下文------------------------ */
1.固定定位fixed相对视口，视口被称为包含块（containing block）

2. 绝对定位，父级无定位就相对初始包含块-初始包含块跟视口一样大，固定在网页的顶部。
x: css \00D7, html &times,

3. 相对定位：下拉菜单中配合js动态添加class,添加延迟，防止鼠标滑过误触下拉菜单。
css-tricks 中the shape of css

4. 层叠上下文和z-index
默认情况下，后面出现的元素覆盖前面的元素。
相对定位依赖于文档流，绝对定位元素依赖于它的定位祖先节点。这时候用z-index属性来控制它们的层叠行为。

给一个 定位 元素加上z-index,会创建层叠上下文。z-index只控制其所在的层叠上下文内的顺序。
层叠上下文有一个根元素，跟第4章的BFC是两个独立的概念。层叠上下文负责决定哪些元素出现在另一些元素前面，而BFC负责处理文档流，以及元素是否会重叠（上下margin的重叠）。

层叠上下文之外的元素无法叠放在层叠上下文内的两个元素之间：2个层叠上下文根元素，里面子元素的层级再高也不会超高比其层叠根元素高的 层叠根元素。
a a a  position: relative;
a b a  z-index: 0
a a a

y y y position: relative;
y x y z-index: 0
y y y
以上，y后出现，比a的层级高，就算a里面的b层级使10000也不会比y高。

说明：
    给一个定位元素加上z-index是创建层叠上下文最主要的方式，但还有别的属性也能创建，比如小于1的opacity属性，还有transform、filter属性。由于这些属性主要会影响元素及其子元
    素渲染的方式，因此一起绘制父子元素。文档根节点（<html>）也会给整个页面创建一个顶级的层叠上下文。

层叠上下文内的元素会按照以下顺序，从 后 -> 前 叠放：
    ①层叠上下文的根
    ②z-index为负的定位元素（及其子元素）
    ③非定位元素
    ④z-index为auto的定位元素（及其子元素）
    ⑤z-index为正的定位元素（及其子元素）


用变量记录z-index,增量需要有间隔方便插值
--z-loading-indicator: 100;
--z-nav-menu:          200;
--z-dropdown-menu:     300;

只有元素放到别的元素前时，用定位。定位能少用就少用，越多越复杂。

5.粘性定位sticky
relative和fixed的结合体
粘性元素永远不会超出父元素的范围,只有当父元素的高度大于粘性元素时才会让粘性元素固定.

总结：
    注意层叠上下文的陷阱···



    
/* ------------------------第8章 响应式布局------------------------ */
响应式设计的三大原则:
    ①移动优先，②@media, ③流式布局
1.移动优先， 构建桌面版之前要先构建移动端布局
虽然要先给移动端写布局，但是心里装着整体的设计，才能帮助我们在实现过程中做出合适的决定
text-shadow
不管用什么语言写代码都是一个迭代过程，CSS也不例外,反复尝试。
关闭按钮text-indent 隐藏元素里面的内容，方便屏幕阅读器的使用者。
\2261汉堡图标， classList.toggle();
// 移动适配
<meta name="viewport" content="width=device-width, initial-scale=1"> 
https://developers.google.com/web/tools/chrome-devtools/device-mode/（Chrome）
或者
https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode（Firefox）

mdn: https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag

2. 媒体查询
@media规则会进行条件检查，只有满足所有的条件时，才会将这些样式应用到页面上
注意：
    在媒体查询断点中推荐使用em单位。在各大主流浏览器中，当用户缩放页面或者改变默认的字号时，只有em单位表现一致。
    以px或者rem单位为断点在Safari浏览器里不太可靠。同时当用户默认字号（通常是16px）改变的时候，em还能相应地缩放，因此它更适合当断点。
    @media (-webkit-min-device-pixel-ratio: 2),
            // (min-resolution: 2dppx), 有兼容性问题
            (min-resolution: 192dpi) { ... } ——匹配屏幕分辨率大于等于2dppx（dppx指每个CSS像素里包含的物理像素点数）的设备，比如视网膜屏幕。
提示：
    媒体查询还可以放在标签中。在网页里加入<link rel="stylesheet" media="(min-width: 45em)" href="large-screen.css" />，只有当min-width媒体查
    询条件满足的时候才会将large-screen.css文件的样式应用到页面。然而不管视口宽度如何，样式表都会被下载。这种方式只是为了更好地组织代码，并不会节省网络流量。
@media print|screen,
@media print {
    * {
      color: black !important;
      background: none !important;
    }
    不需要的元素 {
        display: none;
    }
  }
// 断点
.title {      ←---- 移动端样式，对所有的断点都生效
    ...             
}

// 断点设置为35em，因为在这个宽度时，三列布局就开始显得拥挤了。
@media (min-width: 35em) {     ←---- 中等屏幕的断点：覆盖对应的移动端样式
    // 为中等屏幕引入列布局row, column-*
    .title {                         
        ...
    }
}

@media (min-width: 50em) {      ←---- 大屏幕断点：覆盖对应的小屏幕和中等屏幕断点的样式
    .title {                          
        ...
    }
}

响应模式，可以访问 https://bradfrost.github.io/this-is-responsive/patterns.html

3.流式布局（fluid layout）。流式布局，有时被称作液体布局（liquid layout）
在流式布局中，主页面容器通常不会有明确宽度，也不会给百分比宽度，但可能会设置左右内边距，或者设置左右外边距为auto，让其与视口边缘之间产生留白。
也就是说容器可能比视口略窄，但永远不会比视口宽。

主容器中所有列列用百分比或者flexbox。
:root {
    box-sizing: border-box;
    font-size: calc(1vw + 0.6em);
  }
  
  @media (min-width: 50em) {
    :root {                           
      font-size: 1.125em;    // 超过最大断点时，字号不再增长,设置字号的上限。
    }
  }

// 在移动端少用table,table不折行容易元素被隐藏，用了table可以css中display: block;

4.响应式图片
图片通常是网页上最大的资源。首先要保证图片充分压缩。在图片编辑器中选择“Save for Web”选项能够极大地减小图片体积，或者用别的图片压缩工具压缩图片，比如https://tinypng.com/网站。
.hero {                                 
    background-image: url(coffee-beans-small.jpg);  ←---- 给移动设备提供最小的图
  }
  
  @media (min-width: 35em) {
    .hero {                                  
      background-image: url(coffee-beans-medium.jpg);  ←---- 给中等屏幕提供稍大的图
    }
  }
  
  @media (min-width: 50em) {
    .hero {                           
      background-image: url(coffee-beans.jpg);  ←---- 给大屏幕提供完整分辨率的图
    }
  }

媒体查询能够解决用CSS加载图片的问题，但是HTML里的<img>标签的解决方法：srcset属性（“source set”的缩写）。
<img alt="A white coffee mug on a bed of coffee beans"            
     src="coffee-beans-small.jpg"     ←---- 给不支持srcset的浏览器提供常规的src属性（比如IE和Opera Mini）
     srcset="coffee-beans-small.jpg 560w,  （以下3行）每个图片的URL和它的宽度         
             coffee-beans-medium.jpg 800w,          
             coffee-beans.jpg 1280w"       
/>
响应式图片：https://jakearchibald.com/2015/anatomy-of-responsive-images/
图片作为流式布局的一部分，请始终确保它不会超过容器的宽度img { max-width: 100%; }。

总结：
    优先实现移动端设计。
    使用媒体查询，按照视口从小到大的顺序渐进增强网页。
    使用流式布局适应任意浏览器尺寸。
    使用响应式图片适应移动设备的带宽限制。
    不要忘记给视口添加meta标签。





/* -----------------------------------------------------------第三部分　大型应用程序中的CSS----------------------------------------------------------- */
如何组织CSS代码，使其更易于理解和维护?!
/* ------------------------第9章　模块化CSS------------------------ */
为什么要模块化CSS? 当项目规模持续增长出现的问题时，如何解决大规模CSS？新写CSS时，如何不影响旧有的CSS样式？
使用模块组织CSS代码

模块化CSS（modular css)把页面切割成不同的组成部分，这些组成部分可以在不同上下文中重复使用而不相互影响。
封装encapsulation——相关的函数和数据集合在一起组成对象，通常用来隐藏结构化对象内部的状态或值，从而使外部因素不能操作对象内部。
参考：vue中支持css模块化
思路：为页面中DOM添加一个独一无二的class来识别每个模块。

1.基础样式：打基础
normalize.css： https://necolas.github.io/normalize.css/  
提供一个默认样式，方便后续样式进行覆盖。使用通用选择器*或者标签选择器、:root，不要用class、id选择器。

2.一个简单的模块
模块的选择器由单个类名构成，这非常重要。否则，就限制了其使用范围。

模块变体：通过模块修饰符实现，常用的写法是使用两个连字符来表示修饰符，比如message--error。
<div class="message message--error">  ←---- 把模块和修饰符的类名都添加到元素上
.message {
    property: value;
    font-size: 1rem;
}
.message--error {
    color: red;
}
.message--small {
    font-size: 0.8rem;
}
①双连字符的写法来自BEM规范：https://docs.emmet.io/filters/bem/
②不要使用依赖语境的选择器
搞不懂代码就意味着bug变得常见，可能很小的改动就会弄乱大片的样式。删除旧代码也不安全，因为你不了解这段代码是干什么的，是否还在用。样式表越长，问题就愈发严重。
模块化CSS就是要尝试解决这些问题。

当模块需要有不同的外观或者表现的时候，就创建一个可以直接应用到指定元素的修饰符类。比如，写.dropdown--dark，而不是写成.page-header .dropdown。
注意：**千万不要使用基于页面位置的后代选择器来修改模块。

多元素模块：
.media__body,__bem规范中的另一种写法。
避免模块中的通用标签名选择器，.media > div, 如果后期模块中添加div元素就需要修改以前的样式了。.media__item。

3.把模块组织成一个更大的结构
Robert C. Martin在《代码整洁之道》一书中说过，“关于类的第一条规则是类应该短小，第二条规则是还要更短小”。他当时指的是面向对象编程里面的类，但是这些规则也同样适用于CSS里的模块。

// 拆分不同模块的职责
经验：“如果你不得不使用  并（或者和） 这个词来表述模块的职责，那你可能正在描述 多项 职责。”，如果是就需要定义多个模块-单一职责原则。
自己描述下拉菜单，看看是否需要拆分为多个模块？？？

状态类：
.is-open,状态类一般以is|has开头。
重点　状态类的代码要和模块的其他代码放在一起。使用JavaScript动态更改模块表现的时候，要使用状态类去触发改变。

所有的预处理器（比如Sass或者LESS）都提供了把分散的CSS文件合并成一个文件的功能。我们可以用多个文件和多个目录来组织样式，最后提供一个文件给浏览器。这样可以减少浏览器发起的网络请求数，
开发者也可以把代码文件拆分成易于维护的大小。我认为这是预处理器提供的最有价值的特性之一。
main.scss:
    @import 'base'
    @import 'button'
    @import 'dropdown'

// 模块命名，最伤脑子的了
模块的命名应该有意义，无论使用场景是什么。
我们应该换一种思路，思考模块代表什么含义。这一般并不容易。
模块要适用于各种不同场景，而其名称应该简单易记。

4.工具类
用一个类来对元素做一件简单明确的事，比如让文字居中、让元素左浮动，或者清除浮动。这样的类被称为工具类（utility class）。
常放在样式表的底部，模块代码的下面。
工具类是唯一应该使用important注释的地方。
.clearfix::before,
.clearfix::after {
    content: " ",
    display: table;
}
.clearfix::after {
    clear: both;
}

5.css方法论
https://docs.emmet.io/filters/bem/
    OOCSS——面向对象的CSS，由Nicole Sullivan创建。
    SMACSS——可扩展的、模块化CSS架构，由Jonathan Snook创建。
    BEM——块（Block）、元素（Element）和修饰符（Modifier），由Yandex公司提出。
    ITCSS——倒三角形CSS，由Harry Roberts创建
这个列表大体上是按时间顺序排列的，同时针对代码组织的约束也在增强。OOCSS仅是基于一些引导原则，ITCSS对类的命名和样式归类有明确的规则，SMACSS和BEM则介于两者之间。
本章中已经介绍了样式表的三个主要组成部分：基础样式、模块样式和工具类。SMACSS增加了布局样式的部分，用来处理页面主要区域的布局（侧边栏、页脚、网格系统等）。ITCSS则进一步将类别分为七个层。

JavaScript替代方案
在大型团队里书写模块化样式，需要一些苛刻的约束条件来确保每个人遵守相同的约定。同时也需要采取一些措施来防止大家新建的模块名称出现冲突。为了解决这些问题，一些Web开发社区开始尝试模块化CSS的替代方案。一番探索后，他们转向了JavaScript，最终发明了一种解决方案，被称为内联样式（inline styles）或者CSS in JS。
这种方案不再依赖类命名的口头约定，而是使用JavaScript来控制，要么生成独一无二的类名，要么使用HTML的style属性引入所有的样式。已经出现了不少具备这种功能的JavaScript库，其中比较流行的有Aphrodite、Styled Components和一个叫作CSS Modules（容易引起误解）的库。绝大部分库绑定了一个JavaScript框架或者工具集，比如WebPack。
这种解决方案目前仍处于试验阶段（甚至有一些争议性），但是值得去了解一下，特别是如果你正在做单页应用程序（SPA）开发。它只能在完全由JavaScript框架渲染的项目里使用，比如ReactJS。采用这种方案需要做一些权衡，并且会限制使用特定的工具集。虽然这并非完美的解决方案，但已经在一些场景验证过是成功的。

总结：
    把CSS拆解成可复用的模块。
    不要书写可能影响其他模块或者改变其他模块外观的样式。
    使用变体类，提供同一模块的不同版本。
    把较大的结构拆解成较小的模块，然后把多个模块组合在一起构建页面。
    在样式表中，把所有用于同一个模块的样式放在一起。
    使用一种命名约定，比如双连字符和双下划线，以便一眼就可以看清楚模块的结构。




/* ------------------------第10章　模式库------------------------ */
模式库（pattern library）或者叫style guides, boootstrap|elemetui|Foundation|Pure样式说明 --kss
/* 详细内容参考原文 */

kss是一个 “style guide generator”，
KSS是Knyle Style Sheets的简写（“Knyle” 来源于作者的名字Kyle Neath）
https://github.com/kneath/kss

markdown Cheatsheet
https://cn.bing.com/search?q=Markdown+Cheatsheet&cvid=0da1830efb44441db09e3b7ee62af1cb&aqs=edge..69i57.1030j0j4&pglt=163&FORM=ANAB01&PC=U531

Placeholder网站提供通用占位图片
https://placeholder.com/

2.改变编写CSS的方式
模块化CSS是编写大规模CSS的核心，模式库是保证这些模块条理清晰、使用方便的手段。

// css优先的工作流程
使用模式库是从传统的CSS开发方式转变而来的一种解决方案。不同于之前的先写HTML页面再写样式，我们实现了模块化的样式，然后使用这些模块拼装成Web页面。
这种解决方案称为CSS优先（CSS First）开发方式，先写CSS，而不是HTML。
可以（并且应该）按照模式库的方式开发CSS，然后在项目中使用这些CSS。

不要盲目地使用框架，要学习思考框架背后的设计思路。
不要盲目地添加整个CSS框架到页面上，只取自己需要的那部分。

以模块化的方式来组织CSS代码，再维护一套与之相应的模式库。




/* -----------------------------------------------------------第四部分　高级话题----------------------------------------------------------- */
这部分重点在设计考量上。小小的细节，可能会对网站的观感产生重大的影响。
/* ------------------------第11章　背景、阴影和混合模式blend modes------------------------ */
线性渐变和径向渐变
盒阴影和文字阴影
调整背景图片的大小和位置
使用混合模式，让背景和内容相结合: 可以把多个背景图片和背景颜色以不同的方式组合在一起。

在实现了页面里某个组件的布局并写完样式之后，不要急着继续，有意识地训练自己，以挑剔的眼光审视刚刚完成的代码。

1.渐变,见css gradient
background: image position size repeat origin(相对边框盒、内边距框盒（初始值）或内容盒子来定位) clip(是否应该填充边框盒（初始值）、内边距框盒或内容盒子) attachment color(渲染到背景图下方);
属性的顺序都是按照正常人的思维逻辑需要的属性。

linear-gradient, 渐变实际上就是背景图片。
background-image: linear-gradient(to right, white, blue); // 角度（deg,按照顺时针方向，从0（垂直向上）点开始，上右下左|rad:弧度，turn:圈数，0.25turn=90deg|grad(iant):百分度，一圈400grad），开始|结束颜色
// 查看css文件中的gradient class
https://css-tricks.com/stripes-css/

2.阴影, 见css shadow
box-shadow,
text-shadow,

如：apple
在看到某个网站上的新设计时，停下来花些时间，用浏览器的开发者工具检查一下，看看这是如何实现的。不要觉得麻烦哦，见多才能识广。

3.混合模式, 见css blend

大部分背景相关的属性可以接受多个值，以逗号分隔。
background-blend-mode: multiply|color-burn|difference|luminosity(亮度，前背景图的明暗和背景颜色色相混合，取决于哪个图层在其他图层之上)
// 混合模式的类型-15种
每一种都使用不同的计算原理来控制生成最终的混合结果。对每一个像素来说，就是取一个图层上的像素颜色，与其他图层上对应像素的颜色拼合计算，生成一个新的像素颜色，最终生成一张混合图片。

效果分类	混合模式	描述
变暗	multiply	前景色越亮，背景色显示出来的越多
        darken	    选择两个颜色中较暗的那个
        color-burn	加深背景色，增加对比度
变亮	screen	    前景色越暗，背景色显示出来的越多
        lighten	    选择两个颜色中较亮的那个
        color-dodge	加亮背景色，降低对比度
对比	overlay	    对暗色使用multiply，对亮色使用screen，以增加对比度，对比效果较柔和
        hard-light	大幅增加对比度，有点像叠加，但是使用加强版的multiply或者screen，对比效果明显
        soft-light	有点类似于hard-light，但是使用burn/dodge来代替multiply/screen
复合	Hue	        将上层颜色的色相混合到下层颜色上
        saturation	将上层颜色的饱和度混合到下层颜色上
        luminosity	将上层颜色的明度混合到下层颜色上
        color	    将上层颜色的色相和饱和度混合到下层颜色上
比较	difference	从亮色中减去暗色
        exclusion	类似于difference，但对比度稍弱

mix-blend-mode: 融合混合模式。不仅可以混合图片，还可以把元素的文本和边框与容器的背景图片混合在一起
background-blend-mode,混合背景图和背景颜色。
使用混合模式，结合渐变和阴影，可以为页面添加很多有意思的视觉效果

总结：
    使用渐变和阴影为页面增加立体效果。
    基本的扁平化设计也可以少量应用阴影和渐变。
    带有明确颜色节点的渐变，可以为元素添加条纹效果。
    小巧的背景渐变比纯色背景更能提升设计效果。
    使用混合模式可以为图片着色或者添加纹理效果。




/* ------------------------第 12 章　对比、颜色和间距------------------------ */
1.对比最重要
对比是设计中的一种手段，通过突出某物来达到吸引注意力的目的。建立统一的模式（可以复用的），然后打破模式，突出页面中重要的部分。
使用不同的颜色、间距和大小是建立对比的一些常用方法。

2.颜色
颜色表示法：十六进制、rgb、HSL(Hue, Saturation饱和度, Lightness亮度)更适合人类读取、颜色命名（red\blue）。
H: 360度的色相环，红（0）、黄（60）、绿（120）、青（180）、蓝（240）、洋红（300）依次过渡，最后回到红色。
S: 0-100%，饱和度，0时没有彩色一片灰。
L: 0-100%，亮度，鲜艳色一般50%亮度，越大颜色越浅（100%白色），越小颜色越暗（0黑色）

熟悉HSL最好的办法，就是去使用它。
https://hslpicker.com/#409dbf,0.7
http://www.workwithcolor.com/hsl-color-picker-01.htm
在style面板中安装shift点击颜色边上小方块，切换格式。

--brand-green: hsl(162, 87%, 21%);    （以下3行）绿色都使用相同的色相
--dark-green: hsl(162, 88%, 30%);        
--medium-green: hsl(162, 73%, 46%);    
// 灰色
--gray-50: hsl(0deg, 0%, 50%);
--gray-80: hsl(0deg, 0%, 80%);

为某种颜色寻找一个搭配的颜色，最简单的方式是找到它的补色（complement）。补色位于色相环的对侧位置，蓝色的补色是黄色+180deg。
颜色理论相关文章：
https://tallys.github.io/color-theory/#start

// 字体颜色的对比效果
W3C的Web内容无障碍指南（Web Content Accessibility Guidelines，WCAG）提供了关于对比度最小值的建议（称为AA级），更严格一点，还有加强型对比度（称为AAA级）
对比度计算工具：contrast ratio

3.间距
文本行之间的间距调整比较麻烦，为什么？
对于段落和标题这样的元素，content-box并不是只有显示出来的文字区域，  元素的行高  决定了内容盒子最终的高度，这要超出字符的顶部和底部。
eg:
    * { line-height: 1.5em; }
    p {
        font-size: 14px;
        line-height: 1.5; // 最终p的盒模型高度为14*1.5=21px;
    }
在CSS中两行文字间的距离由行高决定：0.5*14/2 + 0.5*14/2。
直接设置margin-top|margin-bottom实际上是两个盒子间的距离。不是文字间的距离。查看html中‘间距|行高’

// 为行内元素设置间距inline
文本行的高度是由行高乘以字号决定的。如果为行内元素添加内边距，元素本身会变高，却不会增加文本行的高度。文本行的高度只由行高来决定。
// 见css .line-height
多个inline折行时，如果上下重叠就增加行高。

总结：
    选择性地使用对比，来把用户注意力吸引到页面上重要的部分。
    使用HSL颜色表示法，让颜色处理更简单更易于理解。
    牢记行高可以影响垂直间距。




/* ------------------------第 13 章　排版------------------------ */
1.web字体
@font-face, 告诉浏览器去哪里找到并下载自定义字体，供页面使用。
Typekit,
Webtype,
google fonts：使用
https://developers.google.cn/fonts/docs/getting_started?hl=zh-cn

2.google fonts
字形typeface是一组字体（胖瘦斜体）。
Web字体是拖慢网页加载时间最大的几个元凶之一，仅排在图片之后。// 字体其实就是图片

3.如何使用@font-face
查看
https://fonts.googleapis.com/css?family=Roboto:300|Sansita:800
见css @font-face,

4.　调整字距，提升可读性
line-height和letter-spacing，这两个属性控制文本行之间的距离（垂直方向）和字符之间的距离（水平方向）。

line-height属性的初始值是关键字normal，大约等于1.2（确切的数值是在字体文件中编码的，取决于字体的em大小），但是在大部分情况下，这个值太小了。
对于正文主体来说，介于1.4和1.6之间的值比较理想。

letter-spacing需要一个长度值，用来设置每个字符之间的距离。即使只设置1px，也是很夸张的字间距了，因此这应该是个很小的长度值，一般每次只增加1em的1/100（0.01em）。

行高(文字的高度加上它与下一行文字之间的距离)常用‘点 pt’表示，1英寸96px, 约等72pt, pt * 96/72(1.333) = px;
letter-spacing也可以设置负值，让字符更加紧凑。

text-transform：uppercase|capitalize|lowercase属性可以把所有字母改成大写，不管HTML原始文本如何书写.

// 垂直规律：设计基线网格 baseline grid, 基线网格是指文本行之间重复等距离的标线.
Why is Vertical Rhythm an Important Typography Practice?

5.恼人的FOUT和FOIT
fout: 无样式文本闪动（Flash of Unstyled Text）, 网络字体未下载完前使用系统字体，下载完使用web font导致布局变化。
foit: 不可见文本闪动（Flash of Invisible Text）, 先不渲染字体，等下载完再渲染，导致开始时需要字体的地方显示空白。

以上解决方案：
// 使用Font Face Observer，库
js监控字体加载完成，为html添加class: .font-loaded字体加载成功, .font-failed失败
// 回退到系统字体
① css中使用回退字体，.fonts-loaded中把回退字体改成想要的Web字体，把foit改为fout。（更倾向这种，主要看偏好）
② CSS中使用Web字体，.fonts-failed中把字体改成回退字体。依然会foit,但不会在字体加载失败时出现空白。
Font style matcher网站
// font-display属性
在font-face中使用，font-display: swap; // 立即显示回退字体等web字体可用是立即交换。
fongt-display: auto（foit）|swap|fallback(等100ms隐藏状态，web字体准备好就加载没准备好就回退)|optional(类似于fallback，但是允许浏览器基于网速判断是否显示Web字体);

web字体表现：
Jeremy L. Wagner写的Web Performance in Action

总结：
使用字体供应商（比如谷歌字体）的服务可以轻松集成Web字体。
严格限制添加到网页的Web字体数量，来控制页面体积。
使用@font-face规则集管理自己的字体。
花点时间调整line-height和letter-spacing，使页面段落分明、清晰易读。
使用Font Face Observer或其他JavaScript来协助控制加载行为，防止文本隐藏的问题。
留意以后font-display的支持情况。










/* ------------------------第 14 过渡------------------------ */




/* ------------------------第 15 变换------------------------ */




/* ------------------------第 16 章　动画------------------------ */




















`;