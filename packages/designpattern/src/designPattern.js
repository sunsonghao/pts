/*
 * @Description: js设计模式与开发实践
 * @Author: sunsh
 * @Date: 2021-08-30 15:38:38
 * @LastEditors: sunsh
 * @LastEditTime: 2021-09-14 13:05:49
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


// NOTE 模板方法模式: 基于继承的设计模式
// 组成：抽象父类和具体实现的子类
// 抽象父类中封装的子类算法框架，包括实现一些公共方法（分离出子类中公共方法）及子类中所有方法的执行顺序。
// java中分为抽象类、具体类：抽象类不能实例化，用来被某些具体类继承的，可以包括抽象方法和具体方法（复用）。
// js中没有抽象类的解决方法: js不需要兼容类型实现向上转型，但要解决继承是否实现了抽象类的某个方法：1、额外的属性检查代码2、直接在上级方法中throw new Error('直接抛出错误‘);
class Abstract {
    public() {
        throw new Error('子类必须要实现我')
    }
    init() {
        // 算法框架
        step1();
        // 如果有用户不需要step2, 如何解决这种定制化的需求呢？ 可以通过HOOk钩子函数隔离变化。
        if (!hook()) {
            step2();
        }
        step3();
    }
}
// 使用：框架的搭建、ui组件的创建等 有相同的实现步骤的实践中。
// 好莱坞原则：不要来找我，我有结果的时候会通知你：低层组件将自己挂钩到高层组件中，高层组件决定什么时候、怎么调用低层组件
// 也可以这样实现：
function Abstract1(param) {
    let step1 = param.step1 || function() { throw new Errow('子类必须实现我1') }
    let step2 = param.step2 || function() { throw new Errow('子类必须实现我2') }

    let F = function() {};
    F.prototype.init = function() {
        step1();
        step2();
    }
    return F;
}

// js中并不需要照葫芦画瓢实现该模式，高阶函数是更好的选择。



// NOTE 享元模式flyweight: 是一种用于性能优化的模式。
// 核心：运用共享技术来支持大量细粒度的对象。如果系统中因创建大量功能类似的对象导致内存占用过高，该模式就比较有用了。
// 例子：男女内衣各50种，不需要生成100个模特试衣（100个对象），只需要根据性别生产男女2个模特穿衣拍照即可。
class Model {
    constructor(sex) {
        // 内部状态
        this.sex = sex;
    }
    takePhoto() {
        console.log(this.set + 'underwear' + this.underwear/* 外部状态 */);
    }
}

let male = new Model('male'); //并不是一开始就需要，可以通过工厂函数产生
for (let index = 0; index < 50; index++) {
    male.underwear = 'underwear' + index; // 外部状态可能相当复杂，可以通过一个状态管理器管理起来，通过钩子与共享对象联系。
}
// 该模式通常需要将对象的属性划分为外部状态（根据场景的变化而变化，不能被共享）和内部状态（可以被对象共享、独立于一些场景）。
// 剥离了外部状态的对象称为共享对象，外部状态必要时传入共享对象组成一个完整的对象。通常内部状态由多少种组合，便存在多少个对象。

// 比如文件上传，同时上传100个文件（100个upload）,根据文件的大小使用不同的上传方式。
// 共享对象
class Share { // 剥离外部状态，确定内部状态
    constructor(innerState) {
        this.innerState = innerState;
    }
    otherMethod() {

    }
}
// 工厂函数
function factoryOfShare() {
    let flyweights = {};
    return {
        // 没有内部状态时，编程一个单例；可以没有innerState
        create(innerState) {
            if (flyweights[innerState]) {
                return flyweights[innerState];
            }
            return flyweights[innerState] = new Share(innerState);
        }
    }
}

function ShareManager() {
    let dataDB = {}; // 外部状态集合
    return {
        add: function(dataId, innerState) {
            // todo
            // ···
            dataDB[dataId] = {a: dataId}
            
            let flyweight =  factoryOfShare().create(innerState);
            return flyweight;
        },
        setExternalState(dataId, flyweight) {
            let data = dataDB[dataId];
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    // 外部状态必要时传入对象内部，组成一个完整对象
                   flyweight[key] = data[key];
                }
            }
        }
    }
}

for (let index = 0; index < 50; index++) {
   ShareManager().add(index, 'type'+ index % 2);
    
}
// 享元模式的过程是剥离外部状态，把外部状态保存在别处，合适时组装到对象内部。

// 对象池
// 维护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。如果对象池里没有空闲对象，则创建一个新的对象，
// 当获取出的对象完成它的职责之后， 再进入池子等待被下次获取。

// 数据库连接池、HTTP连接池、DOM操作
// 通用连接池：
var objectPoolFactory = function (createObjFn) {
  var objectPool = [];
  return {
    create: function () {
      var obj =
        objectPool.length === 0
          ? createObjFn.apply(this, arguments)
          : objectPool.shift();
      return obj;
    },
    recover: function (obj) {
      objectPool.push(obj);
    },
  };
}; 
// 享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因都不一样。在一个存在大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题。



// NOTE 职责链模式：类似流水线上的分拣器，一个包裹（客户请求）在流水线上传递，依次经过多个分拣器（对象），直到有一个分拣器处理它。
// 优点：避免请求的发送者和接收者之间的耦合关系，发送者只需要知道链（处理请求的对象连成的一条链）中的第一个节点即可。
// 实际开发：外卖平台满减优惠：满100减10， 满60减5块，满20减免配送费，满减和折扣不能同时使用，平常又是一串if else if else

// 灵活可拆分的链条，避免在上一个节点函数直接指定调用下一个节点函数的名字（传递请求代码被耦合在业务之中）
class ChainNode {
    constructor(nodeFn) {
        this.nodeFn = nodeFn;
        // next node
        this.next = null;
    }

    setNextNode(next) {
        return this.next = next;
    }

    // 向下传递请求
    passRequest(...args) {
        let ret = this.nodeFn.apply(this, args);
        // 根据同步的结果，执行下一个节点。如果是异步，不知道什么时候返回ret，就需要在异步完成后手动执行下一个，参见next
        if (ret === 'execNext') {
            return this.next?.passRequest.apply(this.next, arguments);
        }
        return ret;
    }
    next() {
        return this.next?.passRequest.apply(this.next, arguments);
    }
}

// 节点函数定义
function amount100(amount) {
    if (amount >= 100) {
        console.log('满100减10块');
        return amount -= 10;
    }
    return 'execNext';
}
function amount50(amount) {
    if (amount >= 50 && amount < 100) {
        console.log('满50减5块');
        return amount -= 5;
    }
    return 'execNext';
}
function amount20(amount) {
    if (amount >= 20 && amount < 50) {
        console.log('减2块运费');
        return amount -= 2;
    }
    console.log('没有满减')
    return amount;
}

function asyncAmount(amount) {
    setTimeout(() => {
        // 手动向下走, 可以思考下generator函数的实现
        this.next();
    }, 1000);
}
// 构建chain的节点，并连接起来
let chainAmount100 = new ChainNode(amount100);
let asyncAmount1 = new ChainNode(asyncAmount);
let chainAmount50 = new ChainNode(amount50);
let chainAmount20 = new ChainNode(amount20);

chainAmount100.setNextNode(asyncAmount1);
asyncAmount1.setNextNode(chainAmount50);
chainAmount50.setNextNode(chainAmount20);

chainAmount100.passRequest(80);
chainAmount100.passRequest(200);
chainAmount100.passRequest(10);
// 可以灵活再增加节点，只需要知道第一个节点即可。但是需要一个兜底的函数保证请求能被处理。同时增加了节点对象，要避免过长的链带来的性能损耗。

// 利用AOP实现
Function.prototype.after = function(fn) {
    let _this = this;
    return function() {
        let ret = _this.apply(this, arguments);
        if (ret === 'execNext') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
}
let order = amount100.after(amount50).after(amount20);
order(300);
// 30s_project
// 作用域链、原型链、DOM节点的事件冒泡，都能从中看到职责链模式的存在。
// 可以和组合模式结合，连接部件和父部件。


// NOTE 中介者模式: 解除对象与对象间的耦合关系，增加一个中介者，所有对象通过中介联系，而不是相互引用。 
// 实际：一个表单改变影响其他多个表单
// 多人游戏
class Player {
    constructor(name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'alive';
    }
    win() {
        console.log(this.name + 'win');
    };
    lose() {
        console.log(this.name + 'lose');
    };
    die() {
        this.state = "dead";
        director.receiveMsg('playerDead', this);
    }; // 玩家挂掉
    remove() {
        director.receiveMsg('removePlayer', this);
    }; // 掉线移除
    changeTeam() {
        director.receiveMsg('changeTeam', this);
    }; // 叛变
}

// 中介者：Player的原型方法不再负责执行具体逻辑，而是给中介者发送消息，由中介者执行相关操作。
// 发布订阅模式实现director: 推模式|拉模式
let director = (function() {
    let operators = {}; // 操作方法
    let players = {}; // 保存所有玩家：根据队伍保存

    operators.addPlayer = function(player) {
        // 该颜色队伍是否已经存在
        !players[player.teamColor] && (players[player.teamColor] = []);
        players[player.teamColor].push(player);
    };
    operators.playerDead = function(player) {
        // 玩家挂掉，判断队伍里是否还有人活着，如果没有，则其他队伍所有玩家获胜
        let { teamColor, state } = player, all_dead = true;
        players[teamColor].forEach(member => {
            if (member.state !== 'dead') {
                all_dead = false;
            }
        });

        if (all_dead === true) {
            players[teamColor].forEach(member => {
                member.lose();
            });
            console.log('本队所有玩家挂掉');
            for (const color in players) {
               if (color !== teamColor) {
                   players[color].forEach(member => {
                       member.win();
                   });
               }
            }
            console.log('我们赢了');
        }
        
    };
    operators.removePlayer = function(player) {
        //···
    };
    operators.changeTeam = function(player) {
        // 先在原队伍删除，再在新队伍插入该player
    };


    return {
        receiveMsg: function() {
            let msgType = [].shift.apply(arguments);
            operators[msgType].apply(this, arguments);
        }
    }
})();

// 新建玩家
let playerFactory = function(name, teamColor) {
    let player = new Player(name, teamColor);
    director.receiveMsg('addPlayer', player);

    return player;
}

let players = [playerFactory('小红', 'red'),playerFactory('小红1', 'red')],
    players1 = [playerFactory('小黑', 'blk'),playerFactory('小黑1', 'blk')];
players.forEach(member => {member.die();});

// 总结：中介者模式迎合迪米特法则（最少知识原则：一个对象尽可能少的了解另外一个对象：不和陌生人说话）
// 以一对多的关系取代多对多的网状关系。
// 缺点：增加一个中介者对象，对象间的复杂性转移到了中介者的复杂性上。
// 如果对象间的关系呈指数级增长，可以考虑用中介者模式。


// NOTE 装饰者模式: 可以动态给对象添加额外的职责，而不影响从这个类中派生出的其他对象
// JS动态改变对象比较容易，可以直接改变对象或者对象上的方法。
let dec = {a:function(){
    console.log('基本操作')
}}
let decA = dec.a;
dec.a = function() {
    decA();  // this可能被劫持，这种方法并不保险
    // decA.apply(dec, arguments); // 这种又不是很方便
    console.log('在这里增加操作');
}

// 用AOP装饰函数
let _before = function(fn, beforeFn) {
    return function() {
        beforeFn.apply(this, arguments); // 可以动态改变函数参数
        return fn.apply(this, arguments);
    }
}
// 插件式表单校验：分离表单校验和ajax提交函数
// submit = _before(submit, validate);
// 结合策略模式，就可以把校验规则携程插件的形式，用在不同的项目中。

// 缺点：在原函数上保存的属性会丢失，因为返回的是一个新函数；会叠加函数的作用域，如果装饰链过长，性能也会受到一定影响。
// 代理模式：强调proxy和实体间的关系，这种关系在一开始就可以被确定。本体定义关键功能，代理提供或拒绝对它的访问。（常只有一层）
// 装饰者模式：为对象动态加入行为。用于一开始不能确定对象的全部功能时。（常会形成长长的装饰链）

// 框架提供一些稳定而方便移植的功能，个性化的功能可以在框架之外动态装饰上去。


// NOTE 状态模式：关键是区分事物内部的状态，内部状态的改变往往会带来事物行为的改变。

// 封装总是先封装对象的行为，而不是状态。但是状态模式中刚好相反：状态模式的关键是把事物的每种状态封装成单独的类，跟次状态有关的行为被封装在这个类内部。
// if else if else 跟随状态的增加而增加
// 实现：状态的切换规律事先被完好定义在各个状态类中，同时状态和与之对应的行为局部化，被封装在各自对应的状态类中。
// 状态类
class On {
    constructor(main) {
        this.main = main;
    }

    changeState() {
        this.main.setState(this.main.offState);
    }
}
class Off {
    constructor(main) {
        this.main = main;
    }

    changeState() {
        this.main.setState(this.main.onState);
    }
}
// 主类
class Main {
    constructor() {
        // 统一维护状态对象，并保存main当前的状态currentState
        this.onState = new On(this);
        this.offState = new Off(this);
        this.currentState = this.offState; // default state
    }

    setState(state) {
        this.currentState = state;
    }

    click() {
        this.currentState.changeState();
    }
}
// 以上问题： 好的是状态更加丰满， 不好的状态逻辑重复(缺少抽象类)，状态改变的顺序固定。A->B->A

// 更复杂的文件上传状态：暂停按钮A和删除按钮B
// 文件扫描 !A&&!B 既不能暂停也不能删除
// 扫描完成：根据文件MD5判断，若服务器存在直接 上传完成；文件超大或者损坏（怎么判断损坏 TODO ） 上传失败；其他 上传中。
// 上传中：点A暂停或者恢复。
// 暂停状态: 允许B
// 上传完成: 允许B
// 上传失败：允许B

// 用于上传的插件对象 document.createElement('embed); // 不建议用embed
// 状态类的基类
class Base {
    constructor(main, ...args) {
        this.context = main;
        Object.assign(this.constructor.prototype, args || {});
    }

    clickHandle1() { // 暂停
        throw new Error('子类必须继承父类的clickHandle1方法');
    }
    clickHandle2() { // 删除
        throw new Error('子类必须继承父类的clickHandle2方法');
    }
}

// 扫描状态
class Sign extends Base {
    clickHandle1() { // 暂停
        console.log('扫描中，点击无效')
    }
    clickHandle2() { // 删除
        console.log('上传中，不能删除');
    }
}
class Upload extends Base {
    clickHandle1() { // 暂停
        this.context.pause();
    }
    clickHandle2() { // 删除
        console.log('上传中，不能删除');
    }
}
class Pause extends Base {
    clickHandle1() { // 恢复上传
        this.context.uploading();
    }
    clickHandle2() { // 删除
        console.log('这里是删除操作');
        // this.context.delete(); // 不再实现了
    }
}

class Ctx {
    constructor() {
        this.signState = new Sign(this);
        this.uploadState = new Upload(this);
        this.pauseState = new Pause(this);
        this.currentState = this.signState;
    }

    sign() {
        console.log('扫描中')
        this.currentState = this.signState;
        // 额外操作等等
    }
    uploading() {
        console.log('上传中')
        this.currentState = this.uploadState;
        // 额外操作等等
    }
    pause() {
        this.currentState = this.pauseState;
        // 额外操作等等
    }
    // ···
}
// 状态分散，定义了许多状态类，无法再一个地方看出整个状态机的逻辑。
// 性能：state对象如果比较大可以在需要的时候才创建，如果状态改变频繁则最好一开始就创建好。
// 状态模式和策略模式比较像：只是策略模式中各策略是鹏等的关系，之间没有任何联系。
// 状态的改变 发生在状态对象内部，客户并不需要了解这些细节。
/* 以上两种都是OOP形式的实现：
为每种状态都定义一个状态子类，然后在 Context 中持有这些状态对象的引用，以便把 currState 设置为当前的状态对象 */

/* js版本的状态机 */
// js中状态对象可以直接来，不用非要像OOP中对象从类中来，因此可以很方便委托给FSM处理不同状态
// 改进第一个Main
let FSM = {
    off: {
        click: function() {
            this.currentState = FSM.on;
            console.log('turn on');
        }
        // ···
    },
    on: {
        click: function() {
            this.currentState = FSM.off;
            console.log('turn off');
        }
    }
};
class Main1 {
    constructor() {
        this.currentState = FSM.off;
    }
    click() {
        this.currentState.click.call(this);
    }
}
// or: 抛开灯泡的例子思考：文件上传例子
class Main2 {
    constructor() {
        this.offState = delegate(this, FSM.off);
        this.onState = delegate(this, FSM.on);
        this.currentState = this.offState;
    }
    click() {
        this.currentState.click();
    }
}
function delegate(client, delegation) {
    return {
        click() {
            return delegation.click.apply(client, arguments);
        }
    }
}

/* 表驱动的有限状态机：基于状态表的 */
// https://github.com/jakesgordon/javascript-state-machine
// 实践：按钮的不同状态、ajax的不同状态



// NOTE 适配器模式：解决两个软件实体间接口不兼容的问题 --亡羊补牢的模式
let ali = {
    hello: function() {}
}
let tencent = {
    hi: function() {}
}

function sayHi(corporation) {
    corporation.hi(); // 无法处理ali对象
}

// 适配器
let adapterAli = {
    hi: function() {
        return ali.hello();
    }
};

sayHi(adapterAli);

// 总结： adapter跟decorator\proxy\外观模式比较：通过意图区分
// 适配器模式： 主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够使它们协同作用。
// decorator模式：为了给对象增加功能，常形成一条长装饰链。
// proxy: 为了控制对 对象的访问，常包装一次。
// 外观模式：有人看成一组对象的适配器，显著特点：定义了一个新街口。



/* --------------OOP设计原则和编程技巧------------- */
// 每种设计模式都是为了迎合其中一个或多个设计原则出现的：单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则
// NOTE 单一职责（：引起变化的原因）原则SRP，single responsibility principle
// 一个类应该只有一个引起它变化的原因，在js中该原则多被应用到对象或者方法上： 一个对象|方法只做一件事情。

// 在设计模式中的应用： 
// 代理模式：虚拟代理和本体只负责一个职责，各自变化的时候也不相互影响。
// 迭代器模式： 遍历元素和渲染数据分离。迭代器提供一个方法来访问聚合对象，而不用暴露这个对象的内部表示。
// 单例模式： 管理单例的职责和具体功能fn分别封装。
// 装饰器模式：类或者对象一开始具有一些基本职责，更多的职责是代码运行时动态装饰到对象上去的。

// 何时分离职责:
// 并不是所有职责都需要一一分离
// 第一：需求变化两个职责总是同时变化，那就不必分离。
// 第二：仅当确定职责会发生变化，及时两个职责被耦合在一起也没主动分离的必要，在重构时分离也不迟。

// 违反SRP原则
// 不是一成不变的要遵守原则：jq的attr既赋值又取值，维护麻烦，但用户使用方便。
// 方便性和稳定性间做取舍，取决于具体的应用环境

// 优缺点： 降低了对象复杂度，方便复用和单元测试。缺点，增加编写代码的复杂度，增大了对象间相互联系的难度。


// NOTE 最少知识原则LKP, least knowledge principle（迪米特法则：Law of Demeter, LoD, 源自于美国东北大学的一个Demeter项目）
// 一个软件实体（类、对象、方法等）应该尽可能少地与其他实体发生相互作用。两个对象间不直接彼此通信，就不要直接引用。可以引入第三者对象。

// 体现最多：中介者模式和外观模式。
// 外观模式：为子系统中一组接口提供一致的界面，外观模式定义一个高层接口，使子系统更加容易使用：如，洗衣机的一键洗衣按钮和各种模式按钮。
// 如果外观（一键洗衣）不能满足客户需求，客户可以越过外观直接访问子系统（各个模式按钮）
// 外观模式：关键是定义一个高层接口去封装一组子系统。不要跟普通的封装（表达的是数据的隐藏）混淆。
let sub1 = function() {a(); b();}
let sub2 = function() {c(); d();}
let facade = function() { sub1(); sub2();} // 高层接口

// 封装在LKP中的体现
// 数据的隐藏（提供API供外部访问）和限制变量的作用域。


// NOTE 开放-封闭原则（OCP）：最重要的原则。
// 软件实体（类、模块、函数）应该是可扩展的，但是不可修改。
// OCP核心思想: 当需要给改变一个程序的功能或者给这个程序增加功能时，可以使用增加代码的方式，但是不允许改动程序的源代码。

// 遵守OCP原则的一些方法：
// 一、利用对象的多态性消除条件分支
// 过多的条件分支语句是造成程序违反OCP的一个常见原因，常用技巧：利用对象的多态性。
// 找出变化的地方：
// 可以把系统中稳定不变的部分和容易变化的地方隔离开来，在系统演变的过程中字需要替换变化的部分（前提是变化的部分封装好的）。
function makeSound1(obj) { // 根据不同对象调用对象身上的sound方法，不用根据对象的类型写一堆if else
    obj.sound();
}

// 二、放置挂钩（hook）
// 程序可能变化的地方放置hook函数，根据hook结果的不同决定程序下一步走向，这样程序路径上就多了一个分叉。
// 模板模式中挂钩应用参考tempalte method.

// 三、使用回调
// 把易于变化的部分封装在函数中，当做一个回调传入到一个稳定和封闭的函数中。

// 设计模式中的开放封闭原则
// 装饰者模式、pub-sub模式、
// 模板模式：子类的方法种类和执行顺序是不变的，该逻辑抽出来放到父类的模板方法中。子类的方法具体怎么实现是变化的，把变化的抽出来放到子类中。
// 通过增加子类便能给系统增加新功能，不需要改变抽象父类和其他子类。
// 策略模式：和模板可以替换使用。模板方法模式基于继承的思想，而策略模式偏重组合和委托。
// 代理模式
// 职责链模式：拆分多个if else 到职责链中的函数上

// 符合开放封闭原则的代价是引入抽象层，更多的抽象会增加代码的复杂度。

// 如何遵守：①挑出最容易变化的地方，然后构造抽象来封闭这些变化。②在不可避免修改的时候，尽量修改那些相对容易修改的地方，比如修改开源库的配置文件比修改源代码强。
// 在最初编写代码的时候，先假设变化永远不会发生，这有利于我们迅速完成需求。当变化发生并且对我们接下来的工作造成影响的时候，可以再回过头来封装这些变化的地方。然
// 后确保我们不会掉进同一个坑里


// NOTE 接口和面向接口编程（面向超类型编程|面向抽象编程：针对超类中的abstract方法）
// 三重含义: 库模块提供的API、
// C++等提供的关键字interface: 可以产生一种完全抽象的类，抽象的类表示一种契约，专门负责建立类与类之间的联系。
// 面向接口编程中的接口：更抽象，是对象能响应的请求的集合。

// 静态类型语言中：给一个变量赋值，这个变量既可以使用这个类本身，也可以使用这个类的超类。
// ※※ 只要有可能，不要从具体类继承（抽象类、接口等）
// 抽象类作用：向上转型、约束。
// 如果没有类型检查支持，应该尽可能早的抛出错误提醒开发人员。（js中基类方法中通过throw new Error()提醒开发人员必须继承等）

// 面向接口编程，而不是面向实现编程：
// 不关注对象具体类型，针对超类型中的契约方法编程，可以产生可靠性高德程序，极大减少子系统实现间的相互依赖关系。

// 抽象类是基于单继承的，一个类继承抽象类后无法再继承其他类。 但使用interface, 可以使一个类实现多个interface.

// js不需要抽象类和interface：多态性与生俱来。
// 用鸭子类型（动态类型语言面向对象设计中重要的概念）进行接口检查。
// 借助鸭子类型思想，实现面向接口编程：a && typeof a === 'object' && typeof a.prop === 'number'

// 用 TypeScript 编写基于 interface 的命令模式 
// ...


// NOTE 代码重构
// 提炼函数：独立出来的函数有一个好的命名，本身就祈祷了注释的作用。
// 合并重复的条件片段
// 条件分支语句提炼成函数，起一个良好的名字
// 一些重复的工作，合理使用循环。
// 函数提前return 代替 分支
// 传递对象参数代替过长的参数列表
// 尽量减少参数个数
// 少用?:运算符(逻辑复杂慎用)
// 合理使用链式调用: 调试不方便,链条结构稳定还好如果容易变化建议使用普通调用.
// 分解大型类
// 用return退出多重循环，如果循环后还有代码执行可以放到return后：return nextToDo;