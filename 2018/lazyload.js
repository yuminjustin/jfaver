(function() {
    var X, tar, imgs, Top,   // 差值、监控对象、监控img数组、初始高度（在iframe时）
        Lazy = function(dom, originTop) { 
            tar = dom;

            Top = originTop || tar.offsetTop; // iframe高度

            run()
            window.addEventListener('scroll', run, false);
        },
        run = function() { // 执行
            X = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight;
            imgs = findLazy();
            checkLazy();
        },
        findLazy = function() { // 查找 需要懒加载的图片 
            var lists = tar.getElementsByTagName('img'),
                arr = [];
            for (var i = lists.length - 1; i >= 0; i--) {
                if (lists[i].getAttribute('role') == 'lazy') arr.push(lists[i])
            };
            return arr
        },
        checkLazy = function() { // 检测是否要显示
            imgs.map(function(img) {
                if (img.offsetTop + Top <= X * 1.1) show(img)
            })
        },
        show = function(img) { // 显示图片 并释放监控
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            img.removeAttribute('role');
        }


    window._Lazy = Lazy

})();

/*
   图片要求：
       <img src="自定义初始图片"  data-src="懒加载图片"   role="lazy" />
*/
