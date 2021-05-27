(function () {
   var ajax = function (opts) {
        /*
		   url: 地址 必填
		   success:成功回调 必填
		   method: get||post 选填
		   contentType:请求头  选填
		   data: 传值 选填
		   error：失败回调  选填
		   timeout：超时时间
        */
        opts = opts || {};
        opts.timeout = 1e4; //默认超时时间设置为10秒
        var O2S = function (o) {
            var a = [];
            for (var i in o) {
                a.push(i + "=" + o[i]);
            }
            return a.join("&");
        }
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
            data = O2S(opts.data),
            timer;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (opts.timeout) clearTimeout(timer);
                var re = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status == 200) opts.success(re);
                else {
                    if (opts.error) opts.error(re, xmlhttp.status);
                    else console.log(re, xmlhttp.status);
                }
            }
        }
        if (opts.method == "post" || opts.method == "POST") {
            xmlhttp.open("POST", opts.url, true);
            xmlhttp.setRequestHeader("Content-type", opts.contentType || "application/x-www-form-urlencoded");
            xmlhttp.send(data);
        } else {
            xmlhttp.open("GET", opts.url + "?" + data, true);
            xmlhttp.send();
        }
        if (opts.timeout) {
            timer = setTimeout(function () {
                if (opts.error) opts.error("timeout");
                else console.log("timeout");
            }, opts.timeout);
        }
    }

    window.ajax = ajax;
})();
