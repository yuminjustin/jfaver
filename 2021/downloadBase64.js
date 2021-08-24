//下载base64展示的图片，小工具

const downloadBase64 = (dom) => {
    let parts = dom.src.split(';base64,'),
        contentType = parts[0].split(':')[1],
        subfix = contentType.split('/')[1],
        aLink = document.createElement('a'),
        evt = document.createEvent("HTMLEvents"),
        raw = window.atob(parts[1]),
        rawLength = raw.length,
        uInt8Array = new Uint8Array(rawLength),
        blob = null;

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    blob = new Blob([uInt8Array], {
        type: contentType
    });

    evt.initEvent("click", true, true);

    aLink.download = new Date().getTime() + "." + subfix;
    aLink.href = URL.createObjectURL(blob);

    aLink.click();
}
