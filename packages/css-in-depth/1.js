/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-10-19 14:40:37
 * @LastEditors: sunsh
 * @LastEditTime: 2021-11-01 18:37:49
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

























`;