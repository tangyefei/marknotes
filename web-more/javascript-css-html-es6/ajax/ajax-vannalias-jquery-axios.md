# Ajax with JS, jQuery, axios



## JS实现


基于普通的JS进行封装

```
export default {
  host: '',
  postJson(url, data, callback) {
    return this.ajax(url, {method: "POST", data}, callback);
  },
  get(url, callback) {
    return this.ajax(url, {method: "GET"}, callback)  
  },
  ajax(url, param, callback) {
    url = this.host + url;
    var xhr = createXHR();
    xhr.onreadystatechange = function() {
      if (xhr.readyState==4)  {
        let resp = JSON.parse(xhr.responseText);
        if(xhr.status==200) {
          if(resp.code == 1) {
            callback(resp);
          } else {
            tip((resp.body && resp.body.msg) || "未知错误")
          }
        } else  {
	       // 401 404 500 503 others
          tip("未知错误");
        }
      }
    };
    xhr.open(param.method, url, true);
    
    if(param.method === 'POST') {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.send(JSON.stringify(param.data) || null);
  }
}
```

response的一个成功示例

```
status: 200,
statusText: "OK",
response: "{"code":1,"body":[]}",
responseText: "{"code":1,"body":[]}"
```

response的两个失败示例

```
status: 404,
statusText: "Not Found",
response: "<!DOCTYPE html>",
responseText: "<!DOCTYPE html>",
```

```
status: 404,
statusText: "error",
responseText: "{"timestamp":1556440601945,"status":404,"error":"Not Found","message":"No message available","path":"/api/v1/app/login/detail2"}",
responseJson: {"timestamp":1556440601945,"status":404,"error":"Not Found","message":"No message available","path":"/api/v1/app/login/detail2"}
```

判定成功失败使用主要使用 status，具体的数据来自于 response/responseText/responseJSON/responseHTML。


**why does responseText same with response, both string type?**

[difference-between-xhr-response-and-xhr-responsetext](https://stackoverflow.com/questions/46751610/difference-between-xhr-response-and-xhr-responsetext-on-xmlhttprequest)


## jQuery实现

```

ajax(method, url, data) {
    let token = Utils.getCookie('token');
    let param = { 
      url, 
      type: method, 
      headers: { token }
    };
    if((method == 'post' || method == 'put') && data) {
      param.contentType = 'application/json';
      param.data = JSON.stringify(data);
    } 
    return $.ajax(param).always(function(data, msg, resp){
      if(resp.status == 200) {
        if(data.status == 10101) {
          Tip.message(data.message || '未授权用户，即将跳转到登陆界面');
          setTimeout(() => { window.location.href = '/login.html'; }, 2000);
        } else if(data.status == 404) {
          Tip.message(data.message || '请求找不到');
        } else if(data.status == 500 || data.status == 503) {
          Tip.message(data.message || '服务器错误');
        }
      } 
      else {
        Tip.message(resp.statusText || '系统异常');
      }
    });
  }
```

在jQuery中，类似于 alawys/fail/success的方法为我们提供了一些快捷入口，即：
- success只有status==200才会进入
- fail只有status!=200才会进入
- always则无论如何都会进入


在always和success中（或then的第一个函数），通过data拿到的其实是用responseText转过的对象结构，在fail中的resp则是原始的httpResponse的对象，相当于jQuery提供了一些封装，可以更直观地拿到所需要的数据对象或原始对对象。


**without set dataType="json" how could jQuery parse the result to json structure?**

[what-is-content-type-and-datatype-in-an-ajax-request](https://stackoverflow.com/questions/18701282/what-is-content-type-and-datatype-in-an-ajax-request)

