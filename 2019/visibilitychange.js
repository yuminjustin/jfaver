/* 页面重新加载 */
    document.addEventListener("visibilitychange", function (e) {
        if (document.visibilityState === 'visible') {
            if (window.visibilitychangeFail) return delete window.visibilitychangeFail
            location.reload();
        }
    })
