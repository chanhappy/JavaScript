### NaN
```javascript
console.log(NaN == NaN);  //输出 "false"
```
### Boolean
```javascript
console.log(new Boolean(false) && true);  //输出 "true"
```
### valueOf toString
```javascript
var oStringObject = new String("hello world");
console.log(oStringObject.valueOf() == oStringObject.toString());	 //输出 "true"
```
### 区别：slice substring
```javascript
var oStringObject = "123456789";
console.log(oStringObject.slice(-3));		//输出 "789"
console.log(oStringObject.substring(-3));	//输出 "123456789"
console.log(oStringObject.slice(3, -3));		//输出 "456"
console.log(oStringObject.substring(3, -4));	//输出 "123"
```
+ substring()总把较小的数字作为起始位，较大的数字作为终止位
+ 对于负数参数，slice()方法会用字符串的长度加上参数，substring()方法则将其作为0处理（也就是说将忽略它）