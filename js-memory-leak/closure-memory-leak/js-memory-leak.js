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


