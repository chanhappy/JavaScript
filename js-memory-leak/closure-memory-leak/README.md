# 概述
**内存泄漏** 指由于疏忽或错误造成程序 **未能释放** 已经不再使用的内存。  
JavaScript的垃圾回收机制：**V8在运行时自动回收不再需要使用的对象内存，基于根不可达来回收不使用的内存。** 如下图
<img src="./images/GC2.jpg" width="50%">  
沿着1这个根对象的引用链往下走，9，10无法被访问到，可以被回收了。  
接下来我们通过一个JS内存泄露实例（[A surprising JavaScript memory leak found at Meteor](https://blog.meteor.com/)）来分析探讨。
# 准备工作
## 1. 执行命令：npm install 安装依赖[heapdump](https://www.npmjs.com/package/heapdump)
heapdump记录当前的堆内存（heap）快照，即JS运行所用到的所有对象，对象所占用的内存大小，引用关系等。
## 2. 执行命令：npm run dev  运行测试程序
```javascript
let heapdump = require("heapdump");
let fs = require("fs");
let num = 0;

let theThing = null;
let replaceThing = function () {
    let originalThing = theThing;
    let unused = function () {
        if (originalThing)
            console.log("hi");
    };
    theThing = {
        longStr: new Array(10000).join('*'),
        someMethod: function () {
            console.log(1111);
        }
    };

    //创建heap-snapshot文件夹
    fs.mkdir('./heap-snapshot/', ()=>{
        console.info("dump dir created");
    });

    //记录堆快照
    heapdump.writeSnapshot('./heap-snapshot/' + 'Snapshot'+ num + '.heapsnapshot', () => {
        console.log("heap snapshot file has been saving");
    })
    num ++;
};
 
setInterval(replaceThing, 1000);
```
上述代码是测试程序的主要运行逻辑。setInterval定时器每1000ms调用replaceThing方法，通过heapdump.writeSnapshot记录下每次执行的堆快照。
## 3. 在heap-snapshot文件夹中生成内存快照
运行测试程序之后，在heap-snapshot文件夹中生成了.heapsnapshot后缀的内存快照。打开谷歌浏览器，F12快捷键调出控制台，选择Memory面板，在面板左侧点击鼠标右键，选择需要分析的内存快照，将其加载进来，如下图：
<img src="./images/memory1.jpg">  
# 内存快照分析
## 1. 对比heap-snapshot文件夹中的内存快照
切换到Comparison视图，通过比较多个快照之间的差异来找出内存泄露的对象。
<img src="./images/memory6.jpg">  
上图对比结果的列表中，我们重点关注的是变量（#Delta）的值，每次调用replaceThing方法的时候，新增的对象个数。    
Snapshot0与Snapshot1对比如下：  
<img src="./images/memory2.jpg">  
Snapshot1与Snapshot2对比如下：  
<img src="./images/memory3.jpg">  
Snapshot2与Snapshot3对比如下：  
<img src="./images/memory4.jpg">  
Snapshot3与Snapshot4对比如下：  
<img src="./images/memory5.jpg">  
通过多次对比，每次调用replaceThing方法，<kbd>(closure)</kbd>，<kbd>(string)</kbd>，<kbd>Object</kbd>，<kbd>system/Context</kbd> 四者的内存都会稳定增加。
## 2. 对比结果分析
### 1. closure(闭包)
首先分析closure的堆内存：
<img src="./images/analyse1.jpg">    

接下来分析闭包中的someMethod方法，下图是第一次调用replaceThing方法获取的堆快照：
<img src="./images/analyse2.jpg">  
如上图，someMethod@61157被theThing@61153引用，展开theThing@61153这个对象之后，可以看到：（1）它被Content@1083（即replaceThing函数上下文）引用；（2）previous在这里指：调用theThing@61153前一次的theThing（即replaceThing方法外定义的theThing<kbd>let theThing = null;</kbd>）；（3）previous被Content@1091（即replaceThing函数外的上下文）引用，Content@1083被repleceThing@1089引用。  
**总结：** 有两个theThing的引用未释放，即theThing@61153与previous（<kbd>let theThing = null;</kbd>的theThing对象）  

接下来继续查看第二次，第三次，第四次，第五次调用replaceThing方法获取的堆快照；  
<img src="./images/shot1.jpg" width="26%">
<img src="./images/shot2.jpg" width="23%">
<img src="./images/shot3.jpg" width="24%">
<img src="./images/shot4.jpg" width="25%">  
对比分析之后，总结replaceThing每调用一次，就会比上次调用多出一个previous对象。所以新的对象不断创建，旧的对象并未释放。
接下来对这些不断增加的previous做深入分析。探讨为什么从第一次到第五次调用期间，不断创建出新的theThing对象，但是旧的theThing对象（previous）却一直占用内存未被回收，导致每次调用多出一个previous对象（即旧的theThing）。  
备注：当创建新的theThing对象时，上一次创建的的theThing对象未被释放回收，会成为previous对象。  

针对第五次快照Snapshot4的theThing最初生成的的previous展开：  
<img src="./images/shot5.jpg">  
图中的context：一进入replaceThing，someMethod的作用域会创建一个>Context上下文，如图蓝色框框起来的都是replaceThing或someMethod对>Context上下文的直接引用。
我们可以看到，上图红色框的someMethod与originalThing形成了引用链。为什么会这样呢？虽然unused没有被使用，但是someMethod与unused分享闭包作用域，unused引用了originalThing，所以someMethod对originalThing也有了引用关系（细说：someMethod会直接创建一个Context上下文，这个Context会引用originalThing。形成someMethod-->Context-->originalThing引用链, 例如图中4-5-6，7-8-9， 10-11-12，13-14-15）。如何接触这个引用链呢？留个思考问题，后文给出答案。

### 2. string
接下来查看下string，如下图：
<img src="./images/str1.jpg"> 
如上图，可以看到每次执行replaceThing方法，会增加一个长度为10000的字符串************，这个字符串被被闭包作用域中的longStr引用，造成严重的内存泄漏。

### 3. Object
查看Object，如下图：
<img src="./images/obj1.jpg"> 
如上图，每次执行replaceThing方法，会增加一个Object对象，而这个Object对象正好就是theThing引用的对象：
```javascript
{
    longStr: new Array(10000).join('*'),
    someMethod: function () {
        console.log(1111);
    }
}
```

### 4. system/Context
查看system/Context，如下图：
<img src="./images/content1.jpg"> 
如上图，因为someMethod与unused分享闭包作用域，每次执行replaceThing方法，会增加一个system/Context上下文，而它正好被someMethod与unused直接引用。

# 结论

Meteor的[博文](http://info.meteor.com/blog/an-interesting-kind-of-javascript-memory-leak)增加了 originalThing = null 修复了此问题。如下：
```javascript
let heapdump = require("heapdump");
let fs = require("fs");
let num = 0;

let theThing = null;
let replaceThing = function () {
    let originalThing = theThing;
    let unused = function () {
        if (originalThing)
            console.log("hi");
    };
    theThing = {
        longStr: new Array(10000).join('*'),
        someMethod: function () {
            console.log(1111);
        }
    };

    //创建heap-snapshot文件夹
    fs.mkdir('./heap-snapshot/', ()=>{
        console.info("dump dir created");
    });

    //记录堆快照
    heapdump.writeSnapshot('./heap-snapshot/' + 'Snapshot'+ num + '.heapsnapshot', () => {
        console.log("heap snapshot file has been saving");
    })
    num ++;
    originalThing = null;
};
 
setInterval(replaceThing, 1000);
```
增加了originalThing = null;这句代码之后，解除了someMethod与originalThing形成的引用链（可参考2.1closure的分析）。



