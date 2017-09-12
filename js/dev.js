(function () {
    var l = localStorage || {},
        s = sessionStorage || {},
        error = function (e, fn) {
            if (fn) fn({
                error: e
            });
            else console.error(e.message);
        },
        randomN = function (str) {
            return str + "?v=" + Math.random();
        },
        require = function (url, fn) {
            var head = document.getElementsByTagName('head');
            var script = document.createElement('script');
            head = (head && head.length) ? head[0] : document.body;
            try {
                script.src = randomN(url);
                script.type = "text/javascript";
                head.appendChild(script);
                load(script, fn);
            } catch (e) {
                error(e, fn);
            }
        },
        trycatch = function (fn, fn2, mess) {
            try {
                if (fn()) fn2();
                else throw new Error(mess);
            } catch (e) {
                error(e, fn);
            }
        },
        load = function (o, fn) {
            trycatch(function () {
                if (fn) return 1;
                else return 0;
            }, function () {
                o.onload = o.onreadystatechange = function () {
                    if ((!this.readyState) || this.readyState == "complete" || this.readyState == "loaded") {
                        if (fn) fn({
                            target: this,
                            status: 1
                        });
                    }
                }
            }, "此方法必须含有回调函数");
        },
        browser = function (fn) {
            var n = navigator,
                name, v = 0,
                ua = n.userAgent,
                d = device();
            if (!d.v) {
                name = d.name;
                if (name == 'an' && !(ua.indexOf('U;') > -1)) v = -1;
                return {
                    name: name,
                    v: v
                };
            }
            if (n.appName == "Netscape") {
                if (ua.indexOf("Chrome") > 0) name = 'chrome';
                else if (ua.indexOf("Safari") > 0) name = 'safari';
                if (ua.indexOf("Shuame") > 0) {
                    name = 'ie';
                    v = 11;
                }
                if (ua.indexOf("Edge") > 0) {
                    name = 'edge';
                    v = 12;
                }
                if (ua.indexOf("Firefox") > 0) name = 'firefox';
            } else {
                name = 'ie';
                if (ua.match(/MSIE 10.0/i) == "MSIE 10.0") v = 10;
                else if (ua.match(/MSIE 9.0/i) == "MSIE 9.0") v = 9;
                else if (ua.match(/MSIE 8.0/i) == "MSIE 8.0") v = 8;
                else if (ua.match(/MSIE 7.0/i) == "MSIE 7.0") v = 7;
                else if (ua.match(/MSIE 6.0/i) == "MSIE 6.0") v = 6;
                else v = 5;
            }
            return {
                name: name,
                v: v
            };
        },
        requireIMG = function (url, fn) {
            var img = new Image();
            img.src = randomN(url);
            load(img, fn);
        },
        css3Events = function (o, en, fn) {
            var b = browser();
            if (b.v > 9 || b.v == 0) {
                var aoff = function () {
                    fn(o);
                    o.removeEventListener(en, aoff, false);
                }
                o.addEventListener(en, aoff, false);
            } else fn(o);
        },
        animatend = function (o, fn) {
            css3Events(o, "webkitAnimationEnd", fn);
            css3Events(o, "animationend", fn);
            css3Events(o, "MSAnimationEnd", fn);
        }
    var transitionend = function (o, fn) {
        css3Events(o, "webkitTransitionEnd", fn);
        css3Events(o, "transitionend", fn);
        css3Events(o, "MSTransitionEnd", fn);
    }
    var device = function () {
            var ua = navigator.userAgent,
                name = "pc",
                v = 0;
            if (ua.match(/Android/i)) name = "an";
            else if (ua.match(/BlackBerry/i)) name = "bb";
            else if (ua.match(/iPhone|iPad|iPod/i)) name = "ios";
            else if (ua.match(/IEMobile/i)) name = "wp";
            else if (ua.match(/Mobile/i)) name = "other";
            else v = 1;
            return {
                name: name,
                v: v
            };
        },
        storage = {
            setSession: function (n, v) {
                s[n] = v;
                return true;
            },
            getSession: function (n) {
                return s[n];
            },
            fixSession: function (n, v) {
                if (this.getSession(n)) this.setSession(n, v);
                else return false;
            },
            delSession: function (n) {
                s.removeItem(n);
            },
            disSession: function () {
                s.clear();
            },
            setLoacl: function (n, v) {
                l[n] = v;
                return true;
            },
            getLoacl: function (n) {
                return l[n];
            },
            fixLoacl: function (n, v) {
                if (this.getLoacl(n)) this.setLoacl(n, v);
                else return false;
            },
            delLoacl: function (n) {
                l.removeItem(n);
            },
            disLoacl: function (n) {
                l.clear();
            },
            setCookie: function (n, v, d) {
                var date = new Date();
                date.setDate(date.getDate() + d);
                document.cookie = n + "=" + encodeURIComponent(v) + ((d == null) ? "" : ";expires=" + date.toGMTString());
                return true;
            },
            getCookie: function (n) {
                if (document.cookie.length > 0) {
                    var c1 = document.cookie.indexOf(n + "=");
                    if (c1 > -1) {
                        c1 += (n.length + 1);
                        var c2 = document.cookie.indexOf(";", c1);
                        if (c2 == -1) c2 = document.cookie.length;
                        return decodeURIComponent(document.cookie.substring(c1, c2));
                    } else return false;
                }
            },
            fixCookie: function (n, v, d) {
                if (this.getCookie(n)) {
                    this.setCookie(n, v, d);
                } else return false;
            },
            delCookie: function (n) {
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = n + "=;expires=" + date.toGMTString();
            }
        },
        concat = function (d1, d2, s) {
            var status = 0,
                dn1 = Object.getOwnPropertyNames(d1),
                dn2 = Object.getOwnPropertyNames(d2),
                re = {},
                same = [];
            if (s) status = s;
            for (var i = 0, len = dn1.length; i < len; i++) {
                for (var j = 0, len2 = dn2.length; j < len2; j++) {
                    if (dn1[i] == dn2[j]) {
                        same.push(dn1[i]);
                    }
                    re[dn2[j]] = d2[dn2[j]];
                }
            }
            for (var i = 0, len = same.length; i < len; i++) {
                /*默认有相同的替换新值*/
                /*状态1不换新值；状态2两个都保留；状态3两个都不要*/
                var temp = same[i];
                if (status == 1) re[temp] = d1[temp];
                else if (status == 2) re[temp + "_o"] = d1[temp];
                else if (status == 3) delete re[temp];
                arrys.remove(dn1, temp);
            }
            for (var i = 0, len = dn1.length; i < len; i++) {
                var temp = dn1[i];
                re[temp] = d1[temp];
            }
            return re;
        },
        arrys = {
            indexOf: function (o, val) {
                for (var i = 0; i < o.length; i++) {
                    if (o[i] == val) return i;
                }
                return -1;
            },
            remove: function (o, val) { /*可以按脚标删除也可以按值删除*/
                var index = arrys.indexOf(o, val);
                if (index > -1) {
                    o.splice(index, 1);
                } else {
                    if (o[val]) arrys.remove(o, o[val]);
                    else return false;
                }
            }
        },
        extend = function (f, s, args) {
            if (args) f.call(s, args);
            else f.call(s);
        },
        formatDate = function (t) {
            if (t) {
                var d = new Date(t),
                    year = d.getFullYear(),
                    month = d.getMonth() + 1,
                    date = d.getDate(),
                    hour = d.getHours(),
                    minute = d.getMinutes(),
                    second = d.getSeconds();
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            } else return "取值未知";
        },
        getDataFormUrl = function (url) {
            var url = url || window.location.href,
                search = url.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);
            if (!search) return {};
            var searchStr = search[1],
                searchHash = searchStr.split('&'),
                ret = {};
            searchHash.forEach(function (pair) {
                var temp = '';
                if (temp = (pair.split('=', 1))[0]) {
                    var key = decodeURIComponent(temp);
                    var value = pair.substring(key.length + 1);
                    if (value != undefined) value = decodeURIComponent(value);
                    if (key in ret) {
                        if (ret[key].constructor != Array) ret[key] = [ret[key]];
                        ret[key].push(value);
                    } else ret[key] = value;
                }
            });
            return ret;
        },
        O2S = function (_obj) {
            var t = typeof (_obj);
            if (t != 'object' || _obj === null) {
                if (t == 'string') _obj = '"' + _obj + '"';
                return String(_obj);
            } else {
                if (_obj instanceof Date) return _obj.toLocaleString();
                var n, v, json = [],
                    arr = (_obj && _obj.constructor == Array);
                for (n in _obj) {
                    v = _obj[n];
                    t = typeof (v);
                    if (t == 'string') v = '"' + v + '"';
                    else if (t == "object" && v !== null) v = this.obj2String(v);
                    json.push((arr ? '' : '"' + n + '":') + String(v));
                }
                return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
            }
        },
        jFaver = {
            version: "1.0.1",
            /*异步加载一个js*/
            require: require,
            /*load方法*/
            load: load,
            /*浏览器*/
            browser: browser,
            /*随机数*/
            randomN: randomN,
            /*预加载图片*/
            requireIMG: requireIMG,
            /*css3动画结束*/
            animatend: animatend,
            /*css3过渡结束*/
            transitionend: transitionend,
            /*判断设备*/
            device: device,
            /*存储 html5 或者 cookie*/
            storage: storage,
            /*合并两个对象*/
            concat: concat,
            /*删除某个数组元素*/
            arrRemove: arrys.remove,
            /*继承*/
            extend: extend,
            /*时间戳格式化*/
            formatDate: formatDate,
            /*对象转成string*/
            O2S: O2S,
            /*获取url后面的挂参*/
            getDataFormUrl: getDataFormUrl
        };
    window.j = jFaver;
    window.jFaver = jFaver;
})();
