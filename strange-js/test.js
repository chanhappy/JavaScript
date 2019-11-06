console.log(NaN == NaN);  //输出 "false"
console.log(Infinity/Infinity);  //输出 "NaN"
console.log(Infinity/2);  //输出 "Infinity"
console.log(1/Infinity);  //输出 "0"
console.log(Infinity - Infinity);  //输出 "NaN"

console.log(new Boolean(false) && true);  //输出 "true"

var oStringObject = new String("hello world");
console.log(oStringObject.valueOf() == oStringObject.toString());	 //输出 "true"


var oStringObject = "123456789";
console.log(oStringObject.slice(-3));		//输出 "789"
console.log(oStringObject.substring(-3));	//输出 "123456789"
console.log(oStringObject.slice(3, -3));		//输出 "456"
console.log(oStringObject.substring(3, -4));	//输出 "123"