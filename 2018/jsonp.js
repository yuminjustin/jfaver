(function () {
    function jsonpFormat(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }
    window.jsonp = function (opts) {
        /*
		   url: 地址 必填
		   success:成功回调 必填
		   data: 传值 选填 
		   error：失败回调  选填
		   callback：jsonp 约定名称
		   timeout：超时时间
		*/
        opts = opts || {};
        opts.timeout = 1e4; //默认超时时间设置为10秒
        if (!opts.url) return;
        var callbackName = opts.callback || ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        var params = "";
        if (opts.data) {
            opts.data[opts.callback] = callbackName;
            params += jsonpFormat(opts.data);
        } else params += opts.callback + "=" + callbackName;
        var spt = document.createElement('script');
        oHead.appendChild(spt);
        window[callbackName] = function (json) {
            oHead.removeChild(spt);
            clearTimeout(spt.timer);
            window[callbackName] = null;
            opts.success && opts.success(json);
        };
        spt.src = opts.url + '?' + params;
        if (opts.timeout) {
            spt.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(spt);
                opts.error && opts.error({
                    message: "timeout"
                });
            }, opts.timeout);
        }
    }
})();
