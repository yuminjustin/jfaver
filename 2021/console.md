判断控制台是否打开
        
        function checkDevTools(options) {
            const isFF = ~navigator.userAgent.indexOf("Firefox");
            let toTest = '';
            if (isFF) {
                toTest = /./;
                toTest.toString = function () {
                    options.opened();
                }
            } else {
                toTest = new Image();
                toTest.__defineGetter__('id', function () {
                    options.opened();
                });
            }
            setInterval(function () {
                options.offed();
                console.log(toTest);
                console.clear && console.clear();
            }, 1000);
        }
        /* 调用 */
        checkDevTools({
            opened: function () {
                document.body.innerHTML = 'Dev Tools is on';
            },
            offed: function () {
                document.body.innerHTML = 'Dev Tools is off';
            }
        });

 禁用F12
        
        document.onkeydown = function (e) {
            var currKey = 0, evt = e || window.event;
            currKey = evt.keyCode || evt.which || evt.charCode;
            if (currKey == 123) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
            }
        }
