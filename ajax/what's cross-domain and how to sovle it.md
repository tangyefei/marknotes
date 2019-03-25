# what's cross-domain and how to sovle it

The blog is mixed from nice pages on website, write it is just for self's understand. The refrence include: 

- [浏览器同源政策及其规避方法](www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

## same-origin-policy

All browser obey same-origin-policy, it was imported at 1995 by Netscape and the purpose is to limit cookie obtain, which means cookie set by page A could not visit by page B except for they are same origin. Same origin means follow three attributes same: 

- protocal
- domain
- port

For link `http://www.example.com/dir/page.html`

```
http://www.example.com/dir2/other.html：same-origin
http://example.com/dir/other.html：not same-origin（protocal differrent）
http://v2.www.example.com/dir/other.html：not same-origin（domain differrent）
http://www.example.com:81/dir/other.html：not same-origin（port differrent）
```

As technology developing, the same-origin turns to be more strict and if not same-origin, three kinds of behaviors would been forbiden: 

- cannot read Cookie、LocalStorage and IndexDB
- cannot obtain DOM
- cannot send Ajax request

## ways to evade Ajax reqeust

###  1. set up proxy server

As the same-origin-policy apply only to browser, we can send request to server which satisify policy and then redirect the real request to another server.

### 2. jsonp

javascript part: send request through script tag and add appendix `callback=foo`


```
  // javascript
  function addScriptTag(src) {
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = src;
    document.body.appendChild(script);
  }

  window.onload = function () {
    addScriptTag('http://127.0.0.1:8000/api/admin/jsonp/test?callback=foo');
  }

  function foo(data) {
    console.log('Your public IP address is: ' + data.ip);
  };
```

server part: return response contain `foo({ip: '192.168.0.3'})` structure

```
# django sample
def admin_jsonp_test(request):
    return HttpResponse('foo({"ip":"192.168.0.1"})')
```

actually we may get the callback methods foo through reqeust and format response, then the web page receive response and execute syntax in it's environment.
