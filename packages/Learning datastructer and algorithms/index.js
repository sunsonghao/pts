/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-11-23 11:10:08
 * @LastEditors: sunsh
 * @LastEditTime: 2021-11-29 19:41:28
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
        delete this.items[this.count--]; // 由于栈从栈顶弹出因此count也可以用来表示栈的深度
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



/* 队列queue,双端队里double-ended queue(dequeue) */
// 如：打印队列
// {'0': 'first', '1': 'second'···}
class Queue {
    constructor() {
        this.count = 0; // 加入队列元素的key,因为从头部pop, count不能表示队列的长度
        this.lowest = 0; // 队列头部元素的key
        this.items = {};
    }
    enqueue(ele) {
        this.items[this.count++] = ele;
    }
    // 先进先出，和stack 先进后出不同
    dequeue() {
        if (this.isEmpty()) {
            return void(0);
        }
        const item = this.items[this.lowest];
        delete this.items[this.lowest++];
        return item;
    }
    peek() {
        if (this.isEmpty()) {
            return void(0);
        }
        return this.items[this.lowest];
    }
    size() {
        return this.count - this.lowest;
    }
    isEmpty() {
        return this.lowest === this.count;
    }
    clear() {
        this.lowest = this.count = 0;
        this.items = {};
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let string = '';
        for (let index = this.lowest; index < this.count; index++) {
            string += `,${this.items[index]}`;
        }
        return string.slice(1);
    }
}

let q = new Queue();
q.enqueue('first');
q.enqueue('second');
console.log(q);
q.dequeue();
console.log(q);
q.enqueue('third');
console.log(q, q.size(),q.toString())

// dequeue，队列和和栈的组合：允许同时从前端和后端进行添加和删除，兼具fifo和lifo。使用数组模拟更简单，但复杂度更高
class Dequeue  extends Queue {
    constructor() {
        super();
        console.log('i\'am dequeue!');
    }

    addFront(ele) {
        if (this.isEmpty()) {
            this.addBack(ele);
        } else {
            // 切换key计数器
            this.count = --this.lowest;
            this.items[this.count] = ele;
        }
    }
    removeFront() {
        return this.dequeue();
    }
    addBack(ele) {
        // 切换key计数器
        this.count = this.lowest + this.size();
        return this.enqueue(ele)
    }
    removeBack() {
        if (this.isEmpty()) {
            return void(0);
        }
        const back = this.items[this.lowest + this.size() - 1];
        delete this.items[this.lowest + this.size() - 1];
        return back;
    }
    peekFront() {
        return this.peek();
    }
    peekBack() {
        if (this.isEmpty()) {
            return void(0);
        }
       return this.items[this.lowest + this.size() - 1];
    }
    size() {
        return Object.keys(this.items).length
    }
    isEmpty() {
        return !this.size();
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let string = '';
        for (let index = this.lowest; index < this.lowest + this.size(); index++) {
            string += `,${this.items[index]}`;
        }
        return string.slice(1);
    }
}

let deq = new Dequeue();
deq.addFront(1)
console.log(deq);
deq.addFront(2)
console.log(deq);
deq.addBack(4);
console.log(deq);
deq.removeFront();
console.log(deq, deq.toString());

// 实现回文检查器
// 最简单方法：上海自来水来自海上。比较string == [...string].reverse().join('')， 
// 数据结构双端队列实现：
function palindrome(str) {
    if (str == null || str == void(0) || (str !== null && str.length === 0)) {
        return false;
    }
    str = str.toLocaleLowerCase().split(' ').join('');
    let deq = new Dequeue();
    
    for (let index = 0; index < str.length; index++) {
       deq.addBack(str.charAt(index));
    }

    let res = true;
    while (deq.size() > 1) {
        if (deq.removeBack() !== deq.removeFront()) {
            res = false;
            break;
        }
    }
    return res;
};
console.log(palindrome('abcba'));

// 循环队列（击鼓传花）
function hotPotato(numbers, times) {
    let q = new Queue();
    let eliminated = [];

    for (let index = 0; index < numbers.length; index++) {
        q.enqueue(numbers[index]);
    }
    while(q.size() > 1) {
        // 固定时间停止
        for (let index = 0; index < times; index++) {
            q.enqueue(q.dequeue());
        }
        eliminated.push(q.dequeue());
    }

    return {
        winner: q.dequeue(),
        eliminated,
    }
}
console.log(hotPotato([1, 2, 3, 4, 5], 6));



/* 链表 */
// 链表：动态数据结构意味着可以任意添加删除项，他会按需扩容。JS数组的插入需要移动元素（背后原理）
// （双向链表、循环链表、排序链表）
class Node {
    constructor(ele) {
        this.ele = ele;
        this.next = void(0);
    }
}
// 链表在内存中不是连续的，每次都需要从头开始找
class LinkedList {
    constructor(equalsFn = (a, b) => a === b) {
        this.count = 0; // 元素个数
        this.head = void(0); // 该结构是动态地，可以在任意位置插入元素，需要把head保存下来
        this.equalsFn = equalsFn;
    }
    push(ele) {
        const node = new Node(ele);
        if (this.head == null) {
            this.head = node;
        } else { 
            // 需要找到结尾位置
            let cur = this.head;
            while (cur.next != null) {
                cur = cur.next;
            }
            // 在最后插入元素
            cur.next = node;
        }
        this.count++;
    }
    getEleAt(ind) {
        if (ind >= 0 && ind < this.count) {
            let cur = this.head;
            for (let index = 0; index < ind && cur != null; index++) {
                cur = cur.next;
            }
            return cur;
        }
        return void(0);
    }
    insert(ele, position) {
        if (this.indexIsLegal(position)) {
            const node = new Node(ele);
            if (position === 0) {
                const cur = this.head;
                node.next = cur;
                this.head = node;
            } else {
                let prev = this.getEleAt(position - 1);
                let curr = prev.next;
                node.next = curr;
                prev.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    remove(ele) {
        const index = this.indexOf(ele); 
        return this.removeAt(index);
    }
    removeAt(index) {
        if (this.indexIsLegal(index)) {
            if (index === 0) {
                this.head = this.head.next;
            } else {
                let prev = this.getEleAt(index - 1);
                let cur = this.getEleAt(index);
                prev.next = cur.next;
            }
            this.count--;
            return true;
        }
        return false;
    }
    indexOf(ele) {
        let cur = this.head;
        for (let index = 0; index < this.count && cur != null; index++) {
            if (this.equalsFn(cur, ele)) {
                return index;
            }
            cur = cur.next;
        }
        return -1;
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    getHead() { 
        return this.head;
    } 
    toString() {
        if (this.head == null) {
            return '';
        }
        let string = this.head.ele;
        let cur = this.head.next;
        for (let index = 0; index < this.size() && cur != null; index++) {
            string += ',' + cur.ele;
            cur = cur.next;
        }
        return cur;
    }
    indexIsLegal(index) {
        return (index >=0 && index < this.count)
    }
}











