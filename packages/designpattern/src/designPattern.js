/*
 * @Description: js设计模式与开发实践
 * @Author: sunsh
 * @Date: 2021-08-30 15:38:38
 * @LastEditors: sunsh
 * @LastEditTime: 2021-09-07 16:57:16
 */
/* 设计模式沉思录.pdf
 * 动态语言设计模式 --Peter Norvig 1996
 * 重构：改善既有代码的设计 多态最根本的好处就在于
 */
// 所有设计模式遵循的一条原则：找出程序中变化的地方，并封装起来。--可复用面向对象软件基础
// 辨别模式的关键是意图而不是结构，这个模式出现的场景以及要解决什么问题。
// 可能出现的问题：1. 静态类型语言设计模式照搬到js中。2. 习惯根据模式的名字揣测该模式的一切。

/* --------------基础知识------------- */
/* 1.面向对象的js */
// 1.1鸭子类型duck typing: 走起来、叫起来像鸭子，那它就是鸭子。：指导我们关注对象行为，不关注对象本身。HAS-A不是IS-A.
// 利用鸭式思想，可以在js中实现 面向接口编程。
// 静态语言中，通过抽象类/接口将对象的类型隐藏在超类型后，在类型检查系统下实现对象的相互替换使用：对象的相互替换使用，
// 才能体现多态的价值。


// 1.2 多态
// 含义：同一操作作用到 不同 的对象上，可以产生不同的解释和不同的执行结果。
// 动物：鸡: 叫：咯咯咯、鸭：叫：嘎嘎嘎 
// 多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与 “可能改变的事物”分离开来
var makeSound = function(animal) {
    // animal对象的替换使用，隐藏了对象的类型。
    animal.sound();
}

// 把不变的叫和变化的叫声分离
function Dog() {}
Dog.prototype.sound = function() {
    console.log('wang wang')
}

makeSound(new Dog());

// 类型检查 是表现出对象多态性之前绕不开的话题。
// 向上转型（类型）：类型向下兼容，消除类型之间的耦合。

// 使用 继承 是让对象表现出对台的常用手段：实现继承和接口继承。
// 消除类型间的耦合：js变量类型是运行期可变，因此js多态与生俱来。

// 多态的作用：把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句（最根本的好处在于不必询问 类型，只管调用行为，其他一切多态会安排妥当）。

// 设计模式与多态
// 大部分设计模式的实现都离不开多态的思想。
// js中函数是一等公民，可以封装行为并传递。当调用时返回不同的结果。--多态的一种体现：很多设计模式可以用高阶函数代替实现。


// 1.3 封装：为了信息隐藏
// 封装数据：private··· | 依赖变量的作用域 | 通过Symbol创建私有属性
// 封装实现：对象内部变化对其他对象是透明的，通过API通信。如：迭代器each函数。
// 封装类型：通过抽象类和接口进行。 --js不需要
// 封装变化：找到变化并封装之。创建型模式封装创建对象的变化。结构性封装对象间的组合关系。行为型封装对象的行为变化。

// 1.4 原型模式和基于原型的js对象系统
// js借鉴Self和Smalltalk基于原型的语言，一开始就没打算在js中引入类。
// 以类为中心的语言：对象从类中来。原型编程思想中：对象通过clone另一个对象来。

// NOTE 原型模式(原型编程范型)
// 需要一个跟某对象一模一样的对象时。关键：语言是否提供clone方法：Object.create
Object.create = Object.create ?? function (obj) {
    let F = function() {};
    F.prototype = obj;
    return new F();
}

// Io 语言在 2002 年由 Steve Dekorte 发明。可以从http://iolanguage.com （也是基于原型的）
// 其他对象发源于祖先根对象：Object,就像吸血鬼的故事里总有一个祖先吸血鬼。

// 原型编程范型的一些规则
// 基于原型链的委托机制就是原型继承的本质。
// ① 所有的数据都是对象
// ② 要得到一个对象，不是通过类实例化，而是找到一个对象作为原型并克隆它。
// ③ 对象会记住它的原型
// ④ 如果对象无法响应某个请求，它会把请求委托给自己的原型。--原型继承精髓所在

// js中的原型继承， 对应以上规则①②③④
// ①根对象Object.prototype == null, 通过clone该对象得到新对象（单一继承）, 可以把对象构造器的原型动态指向别的对象，实现一条链。
// 简单的new的实现：1新建空对象。2添加属性__proto__。3改变对象this指向(新建的空对象)并初始化.4函数没有返回对象，则返回this
// LINK https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new
let objectFactory = function() {
    let obj = new Object(),
    Constructor = [].shift.call(arguments);
    
    obj.__proto__ = Constructor.prototype; // ③对象通过__proto__记住它构造器的原型
    // 初始化
    let ret = Constructor.apply(obj, arguments);
    return typeof ref === 'object' ? ret : obj;
}

// 设计模式是对语言不足的补充，用设计模式不如去找一门更好的语言。
Object.create(null); // 创建没有原型的对象
// TODO es6的class背后仍然是通过原型机制来创建对象的


// 原型模式是一种设计模式也是一种编程范型，构成了js语言的根本。


/* 2. this、call、apply */
// this基于函数执行环境动态绑定的，非函数声明时的环境。
// 除去with\eval，还有4中情况。1函数作为对象的属性.2普通函数.3构造函数.4.Function.prototype.call|apply.

// apply第二个参数为带下标的集合（数组|类数组）
Function.prototype.bind = function() {
    let self = this, // 保存原函数
    ctx = [].shift.apply(arguments);
    let args = [].slice.call(arguments);

    return function() {
        return self.apply(ctx, args.concat(Array.from(arguments))); // 组合两次传入的参数
    }
}
// Array.prototype.push.call 传入的对象满足两个条件：对象本身可以存取属性、对象length属性可读写。


/* 3. 闭包和高阶函数 */
// 函数式语言鼻祖LISP，js设计参考LISP两大方言之一Scheme.
// js许多设计模式可以用闭包和高阶函数实现。

// 闭包相关：变量的作用域、变量的生存周期。
// 闭包作用
// 1.封装变量
// 如果一些小函数不需要在程序其他地方使用，最好用闭包封装起来。
var muti = (function() {
    var a = function() {}
    return function() {
        return a();
    }
})();
// 2.延续局部变量寿命
// TODO img对象常用语进行数据上报
/* function reports(src) {
    var img = new Image();
    img.src = src;
} */
// 在发送请求时reports可能已经调用完，img被释放掉，导致请求丢失。

let report = (function() {
    let imgs = [];
    return function(src) {
        let img = new Image();
        imgs.push(img);
        img.src = src;
    }
})();

report('http://xxx.com/getUserInfo');

// 闭包和面向对象设计
// 面向对象中的对象：过程与数据的结合，以方法的形式包含了过程。
// 闭包：在过程中以环境的形式包含了数据。
// 通常，用oop思想能实现的功能也能用closure也能实现。=》 实现数据与方法的分离
let Report1 = function(src) {
    this.imgs = [];
    this.init(src);
}

Report1.prototype.init = function(src) {
    let img = new Image();
        this.imgs.push(img);
        img.src = src;
}

// NOTE 闭包实现命令模式
// 命令模式意图：把请求封装为对象，从而分离请求的发起者和请求的执行者之间的耦合关系。在命令执行前，可以往命令对象中植入命令的执行者。
// oop版本
let tv = {open: function(){ console.log('open');}};
let Commander = function(receiver) {
    this.receiver = receiver;
}

Commander.prototype.execute = function() {
    this.receiver.open();
}

let setCommand = function(command) {
    let flag = 1;
    if(flag) {
        command.execute();
    }
    // ···
}

// 发起者       命令      执行者
setCommand(new Commander(tv));

// closure版本，js中函数作为一等公民可以到处传递，用函数对象不用普通对象封装更简单自然.(oob转换为closure)
let Commander1 = function(receiver) {
    let execute = function() {
        receiver.open(); // receiver数据被封装在闭包中
    }

    return {
        execute: execute
    }
}

setCommand(new Commander1(tv));

// 闭包与内存管理
// 变量放在闭包和全局作用域中对内存的影响一致，并不能说是内存泄漏。回收-> 设置为null。
// 跟内存泄漏有关的是：使用闭包的同时容易形成循环引用，如果闭包的作用域中保存着DOM节点，容易内存泄漏。IE中DOM\BOM实现是通过
// c++中COM对象，com对象使用引用计数策略进行垃圾收集。循环引用就容易导致泄漏，但也不是闭包造成的。


// 高阶函数
// 满足：函数可以作为参数被传递 或者 函数可以作为返回值输出。
// Array.prototype.sort中的排序规则callback
// one函数的实现

// 高阶函数实现AOP(面向切面编程)
// AOP主要作用：核心业务无关的功能抽离，再通过‘动态织入’的方式掺入业务逻辑模块中。
// js中实现AOP都是指把一个函数‘动态织入’到另外一个函数中。
Function.prototype.before = function(beforeFn) {
    let self = this;
    return function() {
        beforeFn.apply(this, arguments);
        return self.apply(this, arguments); // 执行原函数
    }
}

let aop = function() { console.log('aop') }
aop.before(function() { console.log('before aop') })(); // 动态织入

// TODO 高阶函数其他应用
// ①currying(部分求值)，刚开始就是收集参数的一个过程，当达到某个条件时才求值。
const curry = (fn, arity = fn.length, ...args) =>
  (arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args));
// ②uncurrying
Function.prototype.uncurrying = function() {
    let self = this; // Array.prototype.push
    return function(...args) {
        return Function.prototype.call.apply(self, arguments);
    }
}
let push = Array.prototype.push.uncurrying();
push({}, 2);

// ③函数节流，非用户直接调用的情况下，函数可能被频繁触发
// onresize\mousemove\上传进度
// 原理：被执行的操作通过setTimeout延迟执行，如果该次延迟还没完成，则忽略接下来的该函数的调用请求。
let throttle = function(fn, interval) {
    let id,
        self = fn,
        firstTime = true;

    return function() {
        let _this = this;
        if (firstTime) {
            self.apply(_this, arguments);
            return firstTime = false;
        }

        if (!id) {
            id = setTimeout(() => {
                self.apply(_this, arguments);
                clearTimeout(id);
                id = null;
            }, interval);
        }
    }
}
// 防抖debounce原理：被执行的操作通过setTimeout延迟执行，如果该次延迟还没完成，就再次触发操作，那么重新计算时间。
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// ④分时函数，短时间内进行大量操作影响页面性能问题：分批进行。
// 对dataList进行cb操作，每间隔timeSlice进行count次cb操作。
let timeChunk  = function(dataList, cb, count, timeSlice) {
    let t;
    let start = function() {
        for (let index = 0; index < Math.min(count || 1, dataList.length); index++) {
            cb(dataList.shift());
        }
    }
    return function() {
        t = setTimeout(() => {
            if (!dataList.length) {
                clearTimeout(t);
            }
            start();
        }, timeSlice);
    }
}


// ⑤惰性（需要时）加载函数
// 减少页面加载时、代码中根本没调用lazyLoad的弊端。
let lazyLoad = function() {
    let flag = true;
    if(flag) {
        lazyLoad = function() {}
    } else {
        lazyLoad = function() {}
    }
}
// 总结: js中的模式不能照抄基于类的面向对象编程语言，js中很多模式通过闭包和高阶函数实现。相对模式的实现我们更应该关注模式
// 能解决什么问题。



/* --------------设计模式------------- */
// 常用的14种设计模式
// NOTE 单例模式：一个类仅有一个实例，并提供一个访问它的全局访问点。需要一个变量，标记类已实例过。
// 基于类的singleton在js中并不合适：js中实例的创建不需要非要new出来。
// #用代理实现单例模式
function Constructor() {}

let proxySingleton = (function() {
    let instance;

    return function() {
            return instance || (instance = new Constructor());
    }
})();

console.log(new proxySingleton() === new proxySingleton()); // true

// #通用惰性单例，惰性：需要的时候才创建
// 分离单例管理getSingle和创建对象的方法fn.
let getSingle = function(fn) {
    let ret;
    return function() {
            return ret || (ret = fn.apply(this, arguments) ?? true);
    }
}


// NOTE 策略模式: 定义一系列的算法，把它们一个个封装起来，且使他们可以相互替换（这半句相对静态语言：有类型检查机制，个策略类要是想同样的接口）。
// 如：压缩文件程序，可以选择zip算法，也可以选择gzip算法等等
// 两部分组成：环境类context(把客户请求委托给策略对象中某个进行计算)、策略类category（一系列算法 各自 被封装成策略类，算法在策略类内部）
// oop版本
let performanceA = function() {}
performanceA.prototype.calculate = function(salary) {
    return salary * 4;
}
let performanceB = function() {}
performanceB.prototype.calculate = function(salary) {
    let sal = salary * 3;
    console.log(sal);
    return sal;
}
// context类
let Bonus = function() {
    this.salary = null; // 基本工资
    this.category = null; // 评级
}

Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
}
Bonus.prototype.setCategory = function(category) {
    this.category = category;
}

Bonus.prototype.getBonus = function() {
    return this.category.calculate(this.salary); // 委托给策略类
}

let bonus = new Bonus();
bonus.setSalary(1000);
bonus.setCategory(new performanceB());

bonus.getBonus();

// js版本：函数也是对象，不需要oop中new 出来
let strategy = {
    'A': function() {},
    'B': function() {}
}

let context = function(strate) {
    return strategy[strate](); // 对象polymorphism多态的体现
}
// 或者
let context1 = function(fn) {
    return fn();
}
context1(strategy.A);

// 策略模式实现缓动动画 tween.js
// TODO 封装一下动画类Animate
// 不同的缓动算法-> 不同的策略

// 策略模式实现表单校验
// 不同的表单不同的校验策略if else if else if ...
// 校验类Validator委托请求给策略类
// 最重要的思路是：用户如何向校验类发送请求
let strategies = {
    input: function(value, errorMsg) { 
        let flag = false;
        if(flag) { return new Error();}
    },
    textArea: function(value, extraParam, errorMsg) { 
        let flag = false;
        if(flag) { return new Error();}
    },
}

// 用户发送校验请求
let validateFunc = function() {
    let validator = new Validator();
    
    // #第二个参数可以改为数组形式，以此来支持多条检验规则
    validator.add('这里是表单1DOM', '校验策略key', 'errorMsg'); // 添加校验规则
    validator.add('这里是表单2DOM', '校验策略key:校验策略需要的额外参数', 'errorMsg'); // 添加校验规则
    // ···

    let errorMsg = validator.start();
    return errorMsg; // 校验是否通过
};

class Validator {
    constructor() {
        this.cache = []; // 收集校验函数
    }

    add(dom, rule, errorMsg) {
        // 把校验函数添加到cache中
        let rules = rule.split(':');
        this.cache.push(function() {
            // 校验逻辑
            let strategyKey = rules.shift();
            rules.unshift(dom.value);
            rules.push(errorMsg);
            return strategies[strategyKey].apply(dom, rules);
        });
    }

    start() {
        // 遍历cache, 返回校验结果
        // ···
    }
}

// 特点：组合、委托、多态思想
// 组合和委托思想让Context拥有算法执行能力：继承的轻便替代方案。
// strategy类要暴露所有实现，违反最少知识原则。


// NOTE代理模式：为一个对象提供代用品，以便控制对它的访问。 客户 -> 代理 -> 对象本体
// 关键：代理做一些操作后，再把客户请求转给对象本体。
// TODO ES6 Proxy\Reflect

// 保护代理：过滤掉一些请求：控制不同权限的对象对目标对象的访问：js中实现比较困难。
// 虚拟代理：常用，主要讲解。

// 图片预加载
// 单一职责原则：一个类应该仅有一个引起它变化的原因。
let myimage = (function() {
    let img = document.createElement('image');
    document.body.appendChild(img);
    return {
        setSrc: function(src) {
            img.src = src;
        }
    }
})();

// 如果不需要，可以直接myimage.setsrc, 避免代码写到一块动myimage
let proxyImg = (function() {
    let img = new Image();
    img.onload = function() {
        myimage.setSrc(this.src);
    }

    return {
        setSrc: function(src) {
            // 先设置一个loading图片地址，onload再设置真实图片地址
            myimage.setSrc('file:// /c:xxxx/loading.gif');
            img.src = src;
        }
    }
})();

proxyImg.setSrc('真实图片地址');

// 代理和本体接口一致性：可以都return 一个函数。return function(src) {}

// 使用代理合并请求：在固定时间收集数据，时间结束后发送（收集的数据）请求。
// 虚拟代理在惰性加载中：收集要console的操作，等到按下F12时，开始加载脚本,脚本加载完执行收集的操作。

// 缓存代理：可为开销大的操作存储结果，如果传递参数一致，则直接返回之前存储的结果。-> 阶乘
// 如：分页数据缓存：分页数据是异步不能直接缓存，可以通过回调。

// 用高阶函数动态创建代理
let createProxyFactory = function(fn) {
    let cache = {};
    return function() {
        let args = [].join.apply(arguments);
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
}
createProxyFactory('函数1'); // 位函数1增加了缓存
createProxyFactory('函数2');

// 防火墙代理、远程代理、保护代理···。

// 总结： js中常见的是虚拟代理和缓存代理，当发现直接访问某个代理不方便时可以再编写代理。


// NOTE 迭代器模式： 提供一种方法顺序(也可以倒序实现)访问聚合对象中各元素，而不暴露该对象的内部表示。
// 把迭代过程从业务逻辑中分离出来。each(array, cb);

// 内部迭代器：forEach函数的实现等
// 外部迭代器：必须显式地请求迭代下一个元素。ES6的Iterator对象，显式调用next函数。更加灵活
let Iterator = function(obj) {
    let current = 0;
    let next = function() { current++; }
    let isDone = function() {  /* ··· */}
    let getCurrent = function() {  /* ··· */ }
    
    return {
        next,
        isDone,
        getCurrent
    }
}

// 倒序迭代器
// 终止迭代器：callback返回false,可以再for循环中break;

// 迭代器相对简单、语言都内置了


// NOTE 发布订阅模式
/* 实现步骤：1、指定发布者2、订阅者在pub处注册信息（cache存储）3、pub遍历名单，逐个发消息4、订阅者想取消的时候可以remove掉5、以上逻辑可以迁移到别的对象extend
 * 自定义事件listen(key, fn); dispatch(key)
*/
let events = {};
events.cacheClient = {};
events.listen = function(type, fn) {
    if (!this.cacheClient[type]) {
        this.cacheClient[type] = [fn];
    } else {
        this.cacheClient[type].push(fn);
    }
}
events.dispatch = function() {
    let type = [].shift.apply(arguments),
        fns = this.cacheClient[type];
        if (!fns || fns.length == 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments/* 事件触发传递的额外数据 */);
        });

}
events.remove = function(type, fn) {
    let fns = this.cacheClient[type];
    if (!fns) {
        return false;
    }
    if (!fn) {
        fns && (fns.length = 0);
    } else {
        // 反向遍历
        for (let index = fns.length -1; index > -1; index--) {
            if (fns[index] === fn) {
                fns.splice(index, 1);
            }
            
        }
    }
}
// 继承events对象
events.install = (function(target) {
    for (let prop in this) {
        target[prop] = this[prop];
    }
}).bind(events)

let customEvents = {};
events.install(customEvents);
customEvents.listen('hello', function(data) { console.log(data)})
customEvents.dispatch('hello', 'hello pub-sub');
customEvents.remove('hello');
customEvents.dispatch('hello', 'remove');

// 网站登录：其他需要用到用户信息的模块 监听 登录模块完成登录触发的事件。// 可扩展性

// 全局订阅发布对象（跟上面感觉没啥区别呢）
let Events1 = (function() {
    let cacheClient,
        listen,
        dispatch,
        remove;

        // ···

    return {
        listen,
        dispatch,
        remove,
    }
})();
// 模块间通信

// 必须先订阅再发布吗？
// 在没有订阅者的情况下可以把消息包装函数 存放到一个离线堆栈结构中，等有订阅者来时依次触发堆栈中的函数。
// 如：qq离线信息、异步返回的比较快在相应的订阅模块没加载完就返回并触发事件那么可能就需要先发布再订阅
// TODO 重点：trigger时，用function 包裹原trigger操作，加入离线堆栈中。listen时离线堆栈存在时依次执行。

// 事件类型冲突：添加命名空间（babackbone events支持namespace.type）
// TODO 

// 不同于静态类型语言中的实现：需要吧sub对象本身传给pub，sub提供update方法供pub调用更新。
// js中通过注册回调实现。
// 推模型pub：事件发生时，一次性推送所有状态给sub. --js使用的方式
// 拉模型sub：pub仅通知订阅者事件发生，并提供接口供sub主动拉取数据。sub按需取，pub门户大开（提供接口）

// 总结：pub-sub（发布订阅|观察者模式）实现时间和对象上的解耦，帮助实现别的模式-中介模式。mvc|mvvm中也少不了pub-sub参与。
// 缺点：对详间关系被隐藏导致程序维护困难。


// NOTE 命令模式（js隐形模式）：解耦发起者和执行者，把发起者的命令封装为command对象（到处传递）：解耦。comman拥有更长的生命周期（延时执行）、支持撤销、排队操作。
// 撤销操作：new Commander1().execute的反操作：增加一个undo操作即可。：实践：悔棋、编辑器的CTRL + z;
// 重做：执行的command加入到堆栈中，回放时：遍历堆栈顺序执行。
let commandStack = [];
let setCommand2 = function(command) {
    let com = command(/* 参数 */);
    if (com) {
        com();
        commandStack.push(com);
    }
}

let command2 = function(receiver) {
    return function() {
        receiver.execute()
    }
}
// setCommand2(command2);
// 重做
let com2;
while (com2 = commandStack.shift()) {
    com2();
}

// 命令队列：动画操作封装成命令放入队列，前一个执行完成后通知队列（如何通知：回调、事件）执行后一个，防止第二个执行时第一个未执行完。

// 宏命令：一组命令的集合，执行宏命令可一次执行一批命令: 命令模式和组合模式的产物。
// macroCommand对象提供add方法把子命令添加到自身，当执行macroCommand的execute是，依次执行子命令的execute.

//智能命令模式： 没有receiver的智能命令模式，和策略模式比较相似。通过意图区分：策略模式的算法解决的目标比较一致，命令模式command解决的目标根据发散性。


// NOTE 组合模式：将对象组合成树形结构，表示部分-整体的层次结构。利用对象多态性，统一对待组合对象和单个对象，隐藏差异性。
// 如果子节点还是宏对象，则请求继续往下子对象传递。
var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute();
      }
    },
  };
};
var openAcCommand = {
  execute: function () {
    console.log("打开空调");
  },
  //   防止误操作
  add: function() { throw new Error('leaf节点不能添加子节点')}
};
var openTvCommand = {
  execute: function () {
    console.log("打开电视");
  },
}; 
var openRobotCommand = {
  execute: function () {
    console.log("打开扫地机器人");
  },
}; 

// 电视和空调组合命令
let mCommand = MacroCommand();
mCommand.add(openAcCommand);
mCommand.add(openTvCommand);

let mCommand1 = MacroCommand();
mCommand1.add(mCommand);
mCommand1.add(openRobotCommand);

// mCommand1被组合更更复杂的对象，客户不用关心内部细节，只调用顶层对象即可。
mCommand1.execute(); // 打开空调、电视、扫地机器人

// abstract类在组合模式中的应用
/* 以上透明性在静态类型语言中体现得尤为明显。比如在 Java 中，实现组合模式的关键是 Composite 类和 Leaf 类都必须继承自一个 Compenent 
抽象类。这个 Compenent 抽象类既代表组合对象，又代表叶对象，它也能够保证组合对象和叶对象拥有同样名字的方法，从而可以对同一消
息都做出反馈。组合对象和叶对象的具体类型被隐藏在 Compenent 抽象类身后 */
/* JavaScript 中实现组合模式的难点在于要保证组合对象和叶对象对象拥有同样的方法，这通常需要用鸭子类型的思想对它们进行接口检查 */

// 可以用来扫描文件夹：Folder,File 参考MacroCommand(Folder) 和xxxCommand, Folder.prototype.scan = function() {}
// 组合模式是HAS-A不是IS-A,不是父子关系；
// 对一组叶对象操作一致性（给全体发过节费，不适合给今天生日的发祝福右键（找出过生日的，不具有一致性））
// 双向映射关系：子对象隶属于多个组合对象：建立双向关系，太复杂：引入终结者模式管理这些对象。
// 职责链模式提高组合模式性能：树结构复杂，可以避免遍历整棵树：职责链模式：（让请求顺着链（从上到下、从下到上）查找可以处理它的对象。）

// 引用父对象：
// 组合模式使用职责链时，如果从下往上冒泡传递请求，或者删除某个文件时（实际是删除父文件夹下该文件的）
// TODO  
class Folder {
    constructor(name) {
        this.name = name;
        this.files = [];
        this.parent = null;
    }
    add(file) {
        file.parent = this;
        this.files.push(file);
    }
    scan() {
        this.files.forEach(file => {
            file.scan();
        });
    }
    remove() {
        if (!this.parent) {
            return;
        }
        for (let files = this.parent.files, l = files.length - 1; l > -1; l--){
            let file = files[l];
            if (file === this) {
                files.splice(l, 1);
            }
        }
    }
}

// 同Folder,
class File1 {
    // constructor() {}
}

// 何时使用组合模式？1表示对象的部分-整体层次结构2.客户希望统一对待树中的 所有 对象。


// NOTE 模板方法模式





/* --------------设计原则和编程技巧------------- */


