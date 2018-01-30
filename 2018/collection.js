// ----------- 常用算法 收集 2018  -----------------

// -----------异步加载js 并回执
var loadJS = function(url, cb) {
    var spt = document.createElement("script");
    var oHead = document.getElementsByTagName('head')[0];
    oHead.appendChild(spt);
    spt.onload = spt.onreadystatechange = function() {
        cb && cb()
    }
    spt.src = url;
}

// -----------数组随机排序
var shuffle = function(arr) {
    return arr.sort(function() {
        return Math.random() - 0.5;
    });
}

// -----------随机制造字符串
var strMaker: function(len) {
    len = len || 8;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd + "_" + (new Date()).getTime();
}

// -----------图片反盗链二次加载
var showImg = function(oImg) {
    var r = Math.ceil(Math.random() * 100000);
    var url = oImg.getAttribute('src').replace(/http:/, '');
    var html = '<img id="img" src=\'' + url + '?' + r + '\' />';
    var src = 'javascript: try{' +
        'document.charset= "UTF-8";' +
        'window.frameElement.getAttribute("data-srcdoc");' +
        '}catch(e){}';
    var oIframe = document.createElement("iframe");
    oIframe.setAttribute("data-srcdoc", html);
    oIframe.setAttribute("src", src);
    oIframe.setAttribute("seamless", "");
    oIframe.setAttribute("scrolling", "no");
    oIframe.setAttribute("frameBorder", "0");
    oIframe.setAttribute("border", "0");
    oIframe.setAttribute("vspace", 0);
    oIframe.setAttribute("hspace", 0);
    oIframe.setAttribute("marginWidth", 0);
    oIframe.setAttribute("marginHeight", 0);
    oIframe.setAttribute("allowtransparency", !0);
    oIframe.style.cssText = "width:100%;height:100%;background-color:transparent;display:block !important";

    try {
        oImg.parentNode.appendChild(oIframe);
        oImg.parentNode.removeChild(oImg);
    } catch (error) {
        console.log("Image")
    }
}

// -----------document.currentScript shim  面向IE
var getCurrentScript = function() {
    if (document.currentScript) return document.currentScript.src;
    var s, o = {},
        reg = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
        isIE67 = -1 === ("" + document.querySelector).indexOf("[native code]"), //检测IE的6 7的方法
        l = +new Date;
    try {
        o.e()
    } catch (e) {
        s = e.fileName || e.sourceURL || e.stack || e.stacktrace
    }
    if (s) {
        var c = reg.exec(s)[1];
        if (c) return c
    }
    for (var node, e = document.scripts, f = e.length - 1; node = e[f--];)
        if (node.className !== l && "interactive" === node.readyState)
            return node.className = l, isIE67 ? node.getAttribute("src", 4) : node.src;
    return ""
}

// -----------对象转字符串 一维
var O2S = function(o) {
    var a = [];
    for (var i in o) {
        a.push(i + "=" + o[i]);
    }
    return a.join("&");
}

// -----------获取挂参
var getParams = function(str){
    var _search = window.location.search.substr(1),
        data = {};
    _search.replace(/([^&]*)=([^&]*)/g, function(a, b, c) {
        data[b] = c;
    });
    return data;
}
