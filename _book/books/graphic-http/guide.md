
# 译者序

- 讲解网络协议的权威书籍《HTTP权威指南》《TCP/IP详解》但是对初学者不是很友好
- HTTP本身不复杂，概念式学习比较枯燥，但是作为基础值得技术人员深入研究

# 第1章 了解Web及网络基础

![image.png](https://upload-images.jianshu.io/upload_images/134602-db334bbfb44338e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Web使用HTTP（HyperTextTransferProtocol）的协议作为规范，完成从客户端到服务端的一系列操作，因此可以说Web是建立在HTTP上的。
- 1996年HTTP/1.0作为正式标准被公布，97年公布的HTTP/1.1是当前的主流版本，HTTP/2.0仍在制定中（成书较早，HTTP/2.0已经在2015年被大多数浏览器支持）。
- TCP/IP协议族，把互联网关联的协议集合的总称为TCP/IP，也有另外两种是说法，TCP/IP是指TCP和IP这两种协议，以及在IP通信的过程中用到的协议的统称。
- TCP/IP协议族分为如下四层
  - 应用层，向用户提供应用服务时的通信活动，比如FTP，DNS，HTTP。
  - 传输层，提供网络连接中两台计算机之间的数据传输，包含TCP，UDP。
  - 网络层，处理网络上流动的数据包。包含IP协议。
  - 链路层，用例处理网络连接的硬件部分。包含设备驱动、网卡、光纤。
- 负责传输的IP（Internet Protocol）协议
  - 所有网络系统都会用到IP协议，其重要性可见一斑，名字也在TCP/IP中占据半壁假山
  - 它的作用是把数据包传送给对方，两个条件是IP地址和MAC地址
  - IP地址指节点被分配到的地址-可变，MAC地址是指网卡所属固定地址-基本不会改变
  - 通信过程中发送出去的数据要被接收要通过多台计算机和网络设备的中转，中转过程中采用ARP（Adress Resolution Protocol）来搜索下一个中转目标。无论那台计算机或者网络设备都不能掌握网络传输的细节，因为通信的机制就像是货物到集散中心然后送往不同的集散区域进行配送。

![image.png](https://upload-images.jianshu.io/upload_images/134602-2094fdf9f778db03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 提供可靠字节流的TCP协议
  - 字节流服务是指为了方便传输，协议将数据分割成报文段为单位进行管理，并确保数据准确可靠地传送给对方
  - 为了保证通信过程准确可靠采用了三次握手，发送SYN标志给对方，对方回复SYN/ACK的标志回来，再发送ACK标志的数据包给对方握手结束。

- 负责域名解析的DNS（Domain Name System）服务
  - DNS提供了域名到IP地址的解析服务

![image.png](https://upload-images.jianshu.io/upload_images/134602-cefd578d24a3e97d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- URI（Uniform Source Identifier）和URL
  - URI是由某个协议方案（例如HTTP、ftp）所表示的资源定位标识符，标准有30多种，由国际机构颁布和管理
  - URI用于表示互联网的资源，而URL用于表示资源所在的地点，URL是URI的子集，如下是几种URI的例子

```
ftp:// ftp.is.co.za/ rfc/rfc1808.txt 
http://www.ietf.org/rfc/rfc2396.txt 
ldap://[ 2001:db8::7]/c=GB?objectClass?one 
mailto: John.Doe@example.com 
```

# 第2章  HTTP协议的简单介绍


![HTTP支持的方法类型](https://upload-images.jianshu.io/upload_images/134602-f7eea0bcfcd80281.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 请求资源的称为客户端，提供资源的称为服务端，通过HTTP请求可以判定端是客户端还是服务端。
- HTTP请求是由客户端发起的，服务端在没收到请求是不会主动响应给客户端的
- 请求报文由请求方法、协议版本、请求地址、可选的首部字段和内容实体组成。
- 响应首部由协议版本、响应状态码、解释状态码的短语、可选的响应首部和响应实体组成。
- 持久连接的特点是，只要任何一端没有明确提出断开连接，则保持TCP连接状态。好处是减少了重复建立和断开连接的开销，提高了页面响应速度。
- 在HTTP1.1中，所有的连接默认都是持久连接，HTTP/1.0内并未标准化。
- HTTP是无状态的协议，即不对之前发送过的请求和响应进行管理，优点是减少了CPU和内存资源的损耗有利于被广泛使用，为了解决无法记录状态的问题引入了Cookie技术来记录客户端状态。

# 第3章 HTTP报文内的HTTP信息

## 3.1 HTTP报文

![image.png](https://upload-images.jianshu.io/upload_images/134602-7b0a8f84e1466b90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- HTTP协议交互信息采用的媒介称为HTTP报文，请求端的报文称为请求报文，响应端的报文称为响应报文。
- HTTP报文由报文首部和报文主体两部分构成，两者由最初出现的换行符（CR+LF）来划分，通常并不一定要有报文主体。

## 3.2 请求报文和响应报文的结构

![image.png](https://upload-images.jianshu.io/upload_images/134602-61c1cd2f7126b966.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![http-sample.png](https://upload-images.jianshu.io/upload_images/134602-ce7d16732523bb34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 请求行，包含用于请求的方法、请求URI和HTTP版本。
- 状态行，表明响应结果的状态码、原因短语和HTTP版本。
- 首部字段，包含请求和响应的各种条件和属性的字段，具体分为四类
  - 通用首部
  - 请求首部
  - 响应首部
  - 实体首部
- 其他，可能包含HTTP中未定义的首部字段（如Cookie）
   
## 3.3 编码提升传输速率

- HTTP传输过程可以通过编码提升传输速率，但同样会对CPU等资源有更高的要求。
- 报文是通信的基本单位，实体则是有效的荷载数据，概念上略加区分。
- HTTP中可以采用内容编码在数据不改变原样进行编码，接收方收到后再进行解码，常用的编码方式有如下几种：gzip，compress，deflate，identity。
- 分块传输编码（chuncked transfer coding）用于在传输大容量数据时把数据分割成多块，能够让浏览器逐步显示页面。

## 3.4 发送多种数据的多部分对象集合
## 3.5 获取部分内容的范围请求
## 3.6 内容协商返回最合适的内容

# 第4章 返回结果的HTTP状态码
# 第5章 与HTTP协作的Web服务器


# 第6章 HTTP首部

## HTTP首部字段

- 首部字段结构由`字段名:字段值`构成，例如`Keep-Alive: timeout=15, max=100`

- 通用首部字段：请求报文和响应报文都会使用的首部。

![Screen Shot 2019-03-30 at 12.18.52 PM.png](https://upload-images.jianshu.io/upload_images/134602-23c9f5b4098fc6e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

- 请求首部字段：发送请求报文时使用的首部，补充了请求的附加内容、客户端信息、相应内容相关优先级等信息。	
![Screen Shot 2019-03-30 at 12.20.12 PM.png](https://upload-images.jianshu.io/upload_images/134602-a22cf3b3a4c524db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

![Screen Shot 2019-03-30 at 12.28.17 PM.png](https://upload-images.jianshu.io/upload_images/134602-d8012741181170c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)



- 响应报文字段：返回响应报文时使用的首部，补充了响应的附加内容，也会要求客户端额外的内容信息。
![Screen Shot 2019-03-30 at 12.20.33 PM.png](https://upload-images.jianshu.io/upload_images/134602-c5a44383bcdb37bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)


- 实体首部字段：请求报文和响应报文的实体部分使用的首部，补充了资源内容更新时间等与实体有关的信息。

![Screen Shot 2019-03-30 at 12.20.39 PM.png](https://upload-images.jianshu.io/upload_images/134602-2f236e951d75b0ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
![Screen Shot 2019-03-30 at 12.29.09 PM.png](https://upload-images.jianshu.io/upload_images/134602-bb90139a8ee9b021.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

## 通用首部字段

- Connection：控制不再转发的首部字段名；管理持久链接Close/Keep-Alive
- Date: HTTP报文创建的日期和时间
- Pragma: HTTP1.0遗留字段，属于通用首部字段，但用在客户端发送的请求中当中，仅可设置no-cache, 为了兼容使用老协议的服务器会同时使用Cache-Control和Pragma
- Trailer: 说明在报文主体后出现了哪些字段，用于分块传输编码
- Transfer-Encoding: 规定了传输报文主体时采用的编码方式，仅对分块传输有效
- Upgrade：用于检测协议是否可以用更高版本进行通信
- Via: 用于追踪客户端和服务端之间的响应和请求报文的传输路劲
- Warning：从HTTP1.0响应首部演变而来，警告有其格式，并有7种警告类型

## 请求首部字段

- Accept：通知服务器可以处理的媒体类型和优先级。可以指定多个，用q=value来表示，优先级范围为0~1不指定时默认为1.0
- Accept-Charset：通知服务器支持的字符集和优先级
- Accept-Encoding：通知服务器支持的内容编码和优先级（gzip, compress, deflate, identity），其中identity表示不执行压缩或者不会变化的默认编码格式，可以用*作为通配符
- Accept-Language：通知服务器支持的自然语言集。
- Authorization：告知服务器认证信息
- Expect：用来告知服务器，期待出现的某种特定行为
- From：用于告知用户的电子邮件地址
- Host: 告知服务器请求的资源所位于的互联网主机名和端口号
- If-Match: 只有当If-Match字段值跟资源的ETag值一致时才执行请求，否则返回412 Precondition Failed响应
- If-Modified-Since: 告诉服务器如果资源在该值之后进行了更新，则返回资源，否则返回304 Not Modified的响应
- If-None-Match：当If-None-Mactch的值跟ETag的值不一致时，可处理该请求。
- If-Range: 告知服务器，若指定的值和请求资源的ETag或者时间一致时，则作为范围请求处理返回216
- If-Unmodified-Since: 在指定时间段之后未发生变化的情况下才处理请求，否则返回412 Precondition Failed响应
- Max-Forward: 可以转发的最大次数
- Proxy-Authorization: 代理服务器所需要的认证信息
- Range: 告知服务器请求资源的范围
- Referer：告知服务器请求的原始资源的URI
- TE：告知服务器客户端可以处理的传输编码方式和相对优先级
- User-Agent：用户代理的名称等信息

## 响应首部字段
- Accept-Ranges: 用来告知客户端，服务器是否能处理范围请求，可以处理时值为bytes，反之定位none
- Age：告知客户端，原服务器多久前创建了响应，如果是缓存服务器Age是指再次发起认证到认证完成的时间，单位为秒
- ETag：返回将资源一字符串形式做唯一标示的数值，ETag分为强ETag值和弱ETag值。弱ETag值会在字符串才初始处加`W`：`W/"usagi-1234"`。
- Location: 响应接收方会根据它返回的新地址去请求资源，通常结合3xx: Redirection使用
- Proxy-Authorization：将代理服务器所需要的认证信息发送给客户端
- Retry-After：告知客户端在多久之后再放请求，通常跟503 Service Unavailable或3xx: Redirection一起使用
- Server：告知客户端当前服务器上安装的HTTP服务器应用程序的信息
- Vary：限制了缓存的使用范围为跟Vary指定字段一致，否则需要从源服务器返回，例如请求头为 Accept-Language: en-us，响应头中指定Vary：en-us，那么只有当同一个请求地址中Accept-Language仍旧为en-us才可以使用缓存
- WWW-Authenticate: 用于HTTP访问认证，告知客户端适用于资源范文请求URI所指定的资源认证方案和带参数的质询


- HTTP协议中使用的首部字段，不限与RFC2616中定义的47中首部字段，还有Cookie和Set-Cookie等在其他RFC中定义的首部字段，它们的使用频率也很高。



## 实体首部字段
- 在请求和响应报文中，都包含有跟实体相关的首部字段
- Allow：用于告诉客户端，资源所支持的HTTP方法，不支持时会返回405 Method Not Allow作为响应返回
- Content-Encoding：告知客户端，服务器对主体部分选用的内容编码方式。
- Content-Language：告知客户端，服务器主体部分使用的自然语言。
- Content-Length：实体主体部分的大小。
- Content-Location：报文主体部分对应的URI。
- Content-MD5：报文主题的MD5算法的结果值，用于校验是否完整传达。
- Content-Range: 用于告诉客户端，实体是哪个范围内的。
- Content-Type：用于告诉客户端，实体主题的媒体类型。
- Expires：告知客户端，资源失效的日期，缓存服务器会根据Expires来缓存资源，以及决定什么时候源服务器请求资源。跟Cache-Control:max-age结合使用时，会有限处理max-age指令。
- Last-Modified: 指明资源的最终修改时间。

## 为Cookie服务的首部字段

管理服务器和客户端状态的Cookie虽然没有介入到HTTP/1.1的标准中，但在Web网站中得到了广泛使用，他的机制是用户识别和状态管理，通过使用：

- Set-Cookie：响应首部字段，开始状态管理所使用的Cookie信息

![Set-Cookie](https://upload-images.jianshu.io/upload_images/134602-87dcd9062e9b6b02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Cookie：请求首部字段，服务器接收到的Cookie信息，例`Cookie: status=enable`

## 其他首部字段

HTTP首部字段可以自行扩展，因此进场会出现各种非标准的首部字段，比如`X-Frame-Options`, `X-Xss-Protection`, `DNT`, `P3P`。为了跟-标准参数进行区分，通常用`X-`来跟标准参数进行区分，但在新的规定中提议停止该做法，对于已经使用的前缀，不在要求变更。

# 第7章 确保Web安全的HTTPS

## 7.1 内容窃听

通信使用明文（不加密），内容可能会被窃听。TCP/IP协议族的工作机制，通信内容在所有通信线路上都有可能遭窃听，及时信息是加密处理后的，加密处理后的信息本省还是会被人看到的。

防止窃听中最普及的是加密技术，加密对象可有有： 

**通信的加密**

可以通过SSL（Secure Socket Layer）或TLS（Transport Layer Security）组合使用加密通信内容。与SSL组合使用的HTTP被称为HTTPS（HTTP Secure）或HTTP over SSL。

SSL是“Secure Sockets Layer”的缩写，中文叫做“安全套接层”。它是在上世纪90年代中期，由网景公司设计的。到了1999年，SSL 因为应用广泛，已经成为互联网上的事实标准。IETF 就在那年把 SSL 标准化，标准化之后的名称改为 TLS（Transport Layer Security），中文叫做“传输层安全协议”。SSL/TLS可以视作同一个东西的不同阶段。

**内容的加密** 

把HTTP报文里的内容进行加密，客户端需要加密处理后再发送请求。使用的前提是客户端和服务器端同时具备加密和解密机制。

### 7.2 请求伪装

HTTP请求是不会对通信方进行确认的，**任何人都可以发起请求**，服务器接收到请求，不管对方是谁都会返回一个响应（服务器端设定了IP地址和端口号例外），因此存在如下隐患：
- Web服务器坑你是伪造的
- 客户端可能是伪造的
- 通信对象可能不具备访问权限
- 不知道请求来自何方
- 容易遭受海量请求的DoS攻击

SSL不仅提供了加密处理，而且他提供了一种称为证书（由值得信任的第三方颁发）的手段，用于确认服务器和客户端是实际存在的。


### 7.3 请求篡改

因为HTTP协议无法验证报文的完整性，因此响应内容遭到篡改后也没办法获
悉。这种攻击叫做中间人攻击（Man-in-the-Middle attack）。

最常用的是使用MD5 和 SHA-1等散列值校验的方法，以及用来确定文件的数字签名的方法，这些方法不能百分百确定结果正确。

## 7.4 HTTP+加密+认证+完整保护=HTTPS

HTTPS并非新的协议，而是HTTP通信接口部分用SSL和TLS协议代替而已。即HTTP不再是直接和TCP通信，而是先和SSL通信，再由SSL和TCP通信。运行在应用层的SMTP和Telnet等协议均可以配合SSL协议使用，可以说SSL是当今世界上最广泛的网络安全技术。

### 公开秘钥加密

近代**共享秘钥加密方法**（也叫堆成秘钥加密）中，加密算法是公开的，秘钥却是保密的，通过这种方式用以确保加密的安全性。但任何人只要持有秘钥就能解密了因此如何将秘钥安全的转交给对方。

公开密钥加密很好地解决了这个问题，它使用一堆非对称的秘钥，发送密文的一方使用公开秘钥进行加密处理，对方接受到加密的信息以后使用私有秘钥进行解密。这样做的好处是不需要发送用来解密的私有秘钥。

HTTPS通常采用混合加密的机制。因为公开密钥加密的处理与共享秘钥相比，处理速度要慢，因此通常（1）使用公开秘钥安全地交换一些敏感信息，比如后续通信要用到的共享秘钥加密中的秘钥（2）然后使用共享秘钥方式进行通信。

#### 存在的问题

公开秘钥加密还是存在一些问题的，比如无法证明公开密钥本身就是货真价实的。为了解决上述问题，可以使用数字认证机构（CA，Certificate Authority）和相关机构颁发的公开秘钥证书。作为延伸可以了解
- 公开密钥证书的颁发和使用过程
- 可证明组织真实性的EV SSL证书
- 可证明客户端的客户端证书
- 认证机构如果遭到攻击会撼动SSL的可信度
- 自由认证机构颁发的证书成为自签名证书
- 中级认证机构的证书被植入，在不同浏览器上可能受到不同的对待

## 7.3 HTTPS安全通信的步骤

![image.png](https://upload-images.jianshu.io/upload_images/134602-387068deaace40d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因为步骤的介绍中有，很多新的概念和词汇，这里不做细述，需要用到的时候再自行查看每一步的描述内容。

## 7.4 SSL的慢

通信慢，因为SSL部分既要消耗网络资源又要对通信进行处理，所以时间上延长了，和使用HTTP相比，网络负载会慢到2到100倍。

处理慢，因为需要涉及客户端和服务端的加密解密处理，需要消耗CPU及内存等资源，导致负载增加。

因为HTTPS安全可靠但慢，所以对于不包含敏感信息的网站，或者不愿意承从认证机构中购买证书的开销的公司，可能只会选择HTTP通信方式。

对于速度慢这一问题，并没有根本性的解决方案，会使用SSL加速器这种专用服务器来改善问题，它为SSL通信的专用硬件，能够提高SSL的运算速度。



# 第8章 认证

## 何为认证

为了确认访问者是否有访问系统的权限，需要客户端提供一些能自证身份的信息，核对的信息通畅包含：
- 密码：仅本人知道的字符串信息
- 动态令牌：本人持有的设备显示的一次性密码
- 数字证书：仅限本人终端持有的信息
- 生物认证：指纹和虹膜等生理信息
- IC卡

HTTPS使用的认证包括如下分类，后面将对分类进行细致介绍
- Basic认证
- DIGEST认证
- SSL客户端认证
- FormBase认证

## Basic认证

**Basic认证的特点**

- 是从HTTP/1.0就开始的认证方式，仍旧有一部分网站使用这种认证方式。
- 认证过程采用base64编码，但未采用加密处理，通信线路上只要被窃听，信息被盗取的可能性极高。
- 想再一次进行认证时，一般浏览器无法实现认证注销操作。
- 认证不够灵活，并且达不到大多数网站的安全等级，因此并不常用


**Basic认证的步骤**

  - 请求需要Basic认证服务器会返回401 Authorization Required，包含WWW-Authentication的首部字段，字段包含认证方式（Basic）和安全域字符串（realm）。`注：没太理解返回字段的结构`
  - 客户端将用户名和密码拼接好，然后用base64处理过后，设置为Authentication的值发送给服务器。
  - 服务器对认证信息进行认证，如果通过，返回一条包含REQUEST-URI资源的响应。

## Digest认证

- Digest认证同样采用质询响应的方式，但是不会直接发送明文的密码
- Digest认证安全等级高于Basic，但跟HTTPS相比仍是很弱，它提供了用户密码被窃听的机制，但是没法识别用户伪造
- 使用上不那么灵活，并且仍旧达不到大多数网站的安全需求

**Digest认证的步骤**
  - 请求需要Basic认证服务器会返回401 Authorization Required，包含WWW-Authentication的首部字段，字段包含临时质询码nonce。
- 客户端在在首部字段Authorization包含username、realm、nonce、uri 和 response的字段信息。
- 服务器接收到后确认认证信息的正确性，并返回包含REQUEST-URI资源的响应。

## SSL客户端认证

经由HTTPS客户端的证书完成的认证方式。需要实现将证书分发给客户端，并且客户端安装了此证书：
- 服务器发送Certificate Request的报文，要求客户端提供证书
- 用户选择了发送证书以后，证书会以Client Certificate的报文方式发送给服务端
- 服务端验证证书通过后领取到证书内的公开秘钥，然后开始HTTPS加密通信

通常客户端认证会采取双认证的方式，即用SSL客户端证书来认证客户端计算机，用密码来确定这是用户本身的行为。

## 基于表单认证

由于便利性和安全性的问题，Basic认证和Digest认证几乎不怎么使用。另外SSL客户端认证虽然具有比较高的安全等级，但因为导入和费用等问题未得到普及。

对于Web网站的认证功能，满足安全级别的标准规范并不存在，所以只好实现基于表单的认证方式，不同的网站有不同的实现方式，如果有充分的考虑可能具有比较高的安全等级。大致步骤是
- 用户把认证所需信息放在报文实体，以HTTPS的方式发送给服务器
- 通过验证用户发送过来的信息，把认证状态跟为当前用户生成的SessionID绑定起来。
- 在返回响应给客户端时，在首部Set-Cookie字段中写入Sesssion-ID，为了减少跨站脚本攻击，建议在在Cookie内加上httponly属性
- 客户端接收到Sessoin-ID以后，会将它当做Cookie保存在本地，下次发送请求的时候就会自动带上Cookie值

# 第9章 基于HTTP的功能追加协议

HTTP协议最初创立是当做传输HTML文档的协议，但随着Web应用的功能多样性变化，协议本身存在的限制就开始非常明显，但是因为Web浏览器的使用环境已经遍及全球，因此无法完全抛弃HTTP。可以通过Web应用和脚本程序来满足使用需要，也可以根据HTTP定义新的协议规则。

HTTP的瓶颈主要体现在：
- 一条连接上只可发送一个请求。请求只能从客户端开始。
- 客户端不可以接收除响应以外的指令。
- 请求/响应首部未经压缩就发送。首部信息越多延迟越大。
- 发送冗长的首部。每次互相发送相同的首部造成的浪费较多。
- 可任意选择数据压缩格式。非强制压缩发送。

**Ajax**

利用JavaScript和DOM达到局部页面加载替换的技术手段

**Comet**

一旦服务端内容有更新，不会让客户端等待，而是直接给客户端返回响应

**Spedy**

Google在2010年发布的Spedy是为了解决HTTP的性能瓶颈的协议。它尝试在协议级别消除HTTP所遇到的瓶颈。关于它的设计（因为完全没有听闻到使用热度，怀疑都是被废弃的技术了），感兴趣可以参考该书的对应章节。

**双工通信Websocket**

Websocket协议是基于HTTP建立的协议，建立连接的仍是客户端，一旦建立连接，任何一段都可以直接向对方发送报文。特点有：
- 支持服务端直接向客户端推送数据的功能
- 首部信息很小，通信量相应减少

实现Websocket通信需要在发给服务器的首部字段中带上Upgrade: websocket，告知服务器通信协议发生改变。在握手/请求时，请求首部带上Sec-WebSocket-Key当键值，响应首部中返回101 witching Protocols的响应表示成功，并带上Sec-Websocket-Key的字段值（基于Sec-WebSocket-Key生成）。成功握手建立连接以后，不再使用HTTP的数据帧，而是采用Websocket独立的数据帧。JavaScript可以调用“The Websocket API”以实现在Websocket协议下进行双工通信。

**HTTP2.0**

目标是改善用户在使用Web时的体验，是属于改善Web性能的大杀器，只是什么时候广泛使用仍旧是未知，感兴趣可以单独再查询资料。

**WebDAV**

是一个可直接对Web服务器上内容进行直接复制、编辑等操作的分布式文件系统。

# 第10章 构建Web内容的技术

内容有些陈旧并且对于前端开发而言都是已经知道的东西，不再赘述。

# 第11章 Web的攻击技术

## 1. 针对Web的攻击技术

- HTTP协议简单不具备什么安全性问题，攻击主要集中在运行在服务器上的Web资源。

- HTTP协议不具备必要的安全功能，开发者通常会自行开发会话和认证管理，实现过程中的不完备可能暴露出容易受到攻击的Bug。

- 攻击者通过篡改HTTP报文请求，加入攻击代码就可以盗取用户信息或者拿到管理权限。

- 针对Web的攻击模式分为两种：主动攻击（直接访问Web应用把攻击代码传入），被动攻击（通过圈套诱使用户来出发陷阱从而达到攻击目的）

## 2. 因输出值转译不安全引发的安全漏洞

- 跨站脚本攻击（Cross-Site Scriptiont, XSS），利用非法运行的HTML或JavaScript执行的攻击。
- SQL注入攻击，是指针对运行非法的SQL而对Web应用使用的数据库发起的攻击。
- OS命令注入攻击，是指通过Web应用，执行非法的操作系统命令而达到攻击目的。
- HTTP首部注入攻击，是指通过在响应首部添加换行或添加响应首部或主体的攻击。
- 邮件首部注入攻击，通过在邮件首部To或Subject中添加非法内容，对任意地址邮件发送广告或者病毒邮件。

-目录便利攻击。是指对本无意公开的文件目录，通过非法截断其目录路径后，达成访问目的的一种攻击。
远程文件包含漏洞。是指当部分脚本内容需要从其他文件读入时，攻击者利用指定外部服务器的URL充当依赖文件，让脚本读取之后，就可运行任意脚本的一种攻击。

## 3. 因设置或设计上的缺陷引发的安全漏洞
- 强制浏览
- 不正确的错误消息处理
- 开放重定向

## 4. 因会话管理疏忽引发的安全漏洞
- 会话劫持，通过某种手段拿到用户的ID并伪装成该用户的攻击
- 会话固定攻击，强制用户使用攻击者指定的会话ID在陷阱页面诱导用户去认证
- 跨站点请求伪造（Cross-SiteRequestForgeries），设置陷阱让已认证用户进行非预期的个人信息或状态的更新

## 5. 其他安全漏洞
- 密码破解，算出密码突破认证
- 点击劫持，透明按钮或陷阱做成可点击状态
- DoS攻击，通过让资源耗尽或者利用漏洞让服务停止的攻击
- 后门程序，开发设置的隐藏入口









