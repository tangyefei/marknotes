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
  <button id="test">BIU</button>
  <script>
    
  function throttle(func, delay) {
    let last;

    return () => {
      let now = (new Date()).getTime(); 
      if(last == undefined) {
        func();
        last = now;
      } else {
        if(now - last > delay) {
          func();
          last = now;
        }
      }
    }
  }

  var biu = throttle(()=>{console.log('biu:' + (new Date()).getTime())/1000}, 1000);
  // setInterval(biu, 100);
  var button = document.getElementById('test')
  button.addEventListener('click', biu);
</script>
  
</body>
</html>
```