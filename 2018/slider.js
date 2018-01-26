(function() {
// 请使用 div ->ul -> li 的结构  无按钮 无标记
//  box（div）  slider（ul）
    var Sliders = function(box, slider, duration) {
        duration = duration || 3e3;
        var n = 0;
        var idx = 0;
        var timer = null;
        var timer1 = null;
        var timer2 = null;
        var timer3 = null;
        var oDiv = box;
        var oUl = slider;
        var oLi = oUl.getElementsByTagName('li')
            //获取div宽度 
        var oDivWidth = getStyle(oDiv, 'width').split('px')[0] //复制oUl的innerHTML 

        oUl.innerHTML += oUl.innerHTML
            //设置ul宽度 
        oUl.style.width = oLi.length * oDivWidth + 'px'
            //获取ul宽度 
        var oUlWidth = getStyle(oUl, 'width').split('px')[0] //封装获取非行间样式函数 
        function getStyle(obj, sName) {
            if (obj.currentStyle) {
                return obj.currentStyle[sName];
            } else {
                return getComputedStyle(obj, false)[sName];
            }
        }
        //执行函数 
        clearInterval(timer3)
        timer3 = setInterval(function() {
                Run()
            }, duration)
            //封装运动函数 
        function Run() {
            clearInterval(timer)
            idx++;
            timer = setInterval(function() {
                n -= 20;
                oUl.style.left = n + 'px'
                if (n % oDivWidth == 0) {
                    clearInterval(timer3)
                    clearInterval(timer)
                    clearInterval(timer1)
                    timer1 = setTimeout(function() {
                        Run()
                    }, duration)
                }
                if (n <= -oUlWidth / 2) {
                    oUl.style.left = 0;
                    n = 0;
                    clearInterval(timer3)
                    clearInterval(timer)
                    clearInterval(timer1)
                    timer1 = setTimeout(function() {
                        Run()
                    }, duration)
                }
            }, 30)
        }

        //鼠标移入停止滚动 
        oDiv.onmouseover = function() {
            clearInterval(timer3)
            clearInterval(timer2)
            timer2 = setInterval(function() {
                if (n % oDivWidth == 0) {
                    clearInterval(timer)
                    clearInterval(timer1)
                }
            }, 30)

        }

        //鼠标移出继续执行 
        oDiv.onmouseout = function() {
            clearInterval(timer3)
            clearInterval(timer2)
            clearInterval(timer1)
            timer1 = setTimeout(function() {
                Run()
            }, duration)
        }
    }

    window.Sliders = Sliders;
})();
