/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-11-23 11:10:08
 * @LastEditors: sunsh
 * @LastEditTime: 2021-11-24 19:10:58
 */
/* 类型转换 */


/* 数组 */
// map filter reduce
const arr = [1, 2, 3];
console.log(arr.entries()); // Array Iterator {}: [0,1] [1,2] [2,3]


/* 类似于数组的栈和队列结构，更为可控 */
/* 栈 */
// pop|push|peek(返回栈顶元素)|isEmpty|clear|size|toString

// 基于数组，O(n)
class Stack {
    constructor() {
        this.items = []; // stack struct
    }
    pop() {
        return this.items.pop();
    }
    push(ele) {
        return this.items.push(ele); // 可以同时添加多个元素
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length < 1;
    }
    clear() {
        this.items.length = 0;
    }
    size() {
        return this.items.length
    }
}

// 基于对象, O(1)
class Stack1 {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    isEmpty() {
        return this.count === 0;
    }
    push(ele) {
        this.items[++this.count] = ele;
        return this.count;
    }
    pop() {
        if (this.isEmpty()) {
            return void(0)
        }
        
        const pop = this.items[this.count];
        delete this.items[this.count--];
        return pop;
    }
    peek() {
        if (this.isEmpty()) {
            return void(0)
        }
        return this.items[this.count];
    }
    clear() {
        // this.items = {};
        // this.count = 0;
        // 或者
        while(this.count) {
            this.pop();
        }
    }
    size() {
        return Object.keys(this.items).length;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let string = this.items[1];
        for (let index = 2; index <= this.count; index++) {
            string += `,{this.items[index]}`;
        }
        return string;
    }
}

let s = new Stack1();
s.push('x');
s.push('y');
console.log(s);
s.clear();
console.log(s, s.size());

// 私有属性
const _items = Symbol('items');
class Stack2 {
    constructor() {
        this[_items] = {} // 弊端：Object.getOwnPropertySymbols(instance)[0] 能够获取到symbol属性，因此可以在类外部访问到
    }
}
// 私有属性1，参见es6 weakMap
const _items1 = new WeakMap();
class Stack3 {
    // #count = 0; 私有属性
    constructor() {
        _items1.set(this, []); // 每次new的时候this不同 weakmap { this1: [], this2: []}, 弊端：可读性差，无法继承私有属性
    }
    push(ele) {
        const items = _items1.get(this);
        items.push(ele);
    }
    // ...
}

// 实践：十进制转2进制
function decimalToBinary(dec) {
    let stack = new Stack1();
    let mod;
    let bin = '';
    
    while(dec > 0) {
        mod = Math.floor(dec % 2);
        stack.push(mod);
        dec = Math.floor(dec / 2);
    }
    while(!stack.isEmpty()) {
        bin += stack.pop().toString();
    }
    return bin;
}
console.log(decimalToBinary(4)); // 100

// 进制转换(2到36进制)
function decimal(dec, base) {
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let stack = new Stack1();
    let mod;
    let bin = '';
    
    if (!(base >= 2 && base <=36)) {
        return ''
    }
    while(dec > 0) {
        mod = Math.floor(dec % base);
        stack.push(mod);
        dec = Math.floor(dec / base);
    }
    while(!stack.isEmpty()) {
        bin += digits[stack.pop()];
    }
    return bin;
}
console.log(decimal(15, 16)); // F