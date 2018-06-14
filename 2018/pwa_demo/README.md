超简单的PWA  demo

     npm install
     npm  run test


# PWA（Progressive Web App）
渐进式网络应用。正由于是渐进式的特性，即使是在不支持serviceWorker的浏览器下也不会出现访问不了，也不用改变现有的开发模式，只是另外注册一下，而且serviceWorker和现有的逻辑是分离的，serviceWorker完全是异步，不用绑定也不允许绑定到具体页面。对前端开发人员来说更像是在写一个独立的服务层路由的感觉。<br/><br/>
serviceWorker能让前端开发者来控制浏览器来缓存那些文件，拦截进出的 HTTP 请求，从而完全控制你的网站。使得前端开发者有了更多自主权和想象空间。<br/><br/>
## serviceWorker基本特点
<ul>
   <li>运行在它自己的全局脚本上下文中</li>
   <li>不绑定到具体的网页</li>
   <li>无法修改网页中的元素，因为它无法访问 DOM</li>
   <li>只能使用 HTTPS</li>
   <li>拦截进出的 HTTP 请求，从而完全控制你的网站</li>
   <li>与主JS线程独立，不会被阻塞</li>
   <li>完全异步，无法使用localStorage</li>
   <li>生命周期(想象成红绿灯    注册时(红灯)   安装时（黄灯)   安装成功（绿灯）)</li>
</ul>

### 超简单示例 <br/>
掘金的文章 :https://juejin.im/post/5abba6a7f265da239706ec60<br/><br/>

个人感觉PWA的模式对现有的前端趋势是一个锦上添花的是事情，而不是重新改写行业标准，不敢保证它一定会流行，但绝对不是阻碍项目的绊脚石。
