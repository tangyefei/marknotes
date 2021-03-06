```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    // 基础数据类型：null, undefined, number, string, boolean, symbol
    // 复合数据类型：object, array, function, date, regexp
    // 扩展：考虑key是否为symbol，考虑结构是否为ES6的新数据结构

    function is(model, value) { return Object.prototype.toString.call(value).slice(8,-1) === model; }
    function isDate(value) { return is('Date', value); }
    function isRegExp(value) { return is('RegExp', value); }
    function isFunction(value) { return is('Function', value); }

    var source = {
      null: null, 
      boolean: 1, 
      undefined: undefined, 
      string: 's',  

      date: new Date(),
      regexp: /\w+/ig,
      func: ()=>{},

      object: {deep:true}, 
      array: [1,2,3],
    };

    function deepCopy(value){
      let type = typeof value;

      // 非复合数据类型，直接返回值
      if(value === null || (type != 'object' && type !=' function')) {
        return value;
      } 
      else if(isDate(value)) {
        const result = new value.constructor(+value)
        return result;
      } 
      else if(isRegExp(value)) {
        const result = new value.constructor(value.source, /\w*$/.exec(value))
        result.lastIndex = value.lastIndex
        return result
      } 
      else if(isFunction(value)) {
        return Object.create(Object.getPrototypeOf(value))
      }
      
      // update: Object.keys会将symbol直接转化为字符串
      const isArr = Array.isArray(value);
      const props = isArr ? value : Object.keys(value);

      let result = isArr ? new Array(value.length) : new Object();

      props.forEach((prop,index) => {
        if(isArr){
          result[index] = deepCopy(prop)
        } else {
          result[prop] = deepCopy(value[prop]);
        }
      });
      return result;
    }

    var target = deepCopy(source);

    console.log('null compare:' + source.null === target.null);
    console.log('boolean compare:' + source.boolean === target.boolean);
    console.log('undefined compare:' + source.undefined === target.undefined);
    console.log('string compare:' + source.string === target.string);
    console.log('date compare:' + source.date === target.date);
    console.log('regexp compare:' + source.regexp === target.regexp);
    console.log('func compare:' + source.func === target.func);
    console.log('object compare:' + source.object === target.object);
    console.log('array compare:' + source.array === target.array);
    console.log(source);
    console.log(target);

  </script>
</body>
</html>
```