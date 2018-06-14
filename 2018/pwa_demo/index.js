// index.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}


window.onload = function () {
    var p = document.createElement("p");
    p.innerHTML = 'PWA!';
    document.body.appendChild(p)
}
