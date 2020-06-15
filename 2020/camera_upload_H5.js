/* change 事件 之后 */

/*
opts 格式：
{
  url: "地址",
  name: "上传字段名称",
  files,  // 文件
  progress: () => {
    // 上传进度回调
  },
  success: (json) => {
    // 上传成功回调
  },
  error: (json) => {
    // 异常回调
  }
*/
const upload = (opts) => {
    let file = opts.files[0],
        fn = (_file) => { /* 上传 */
            let _xhr = new XMLHttpRequest(),
                formData = new FormData();
            _xhr.upload.addEventListener("progress", function (event) {
                opts.progress();
            }, false);
            _xhr.onreadystatechange = function (e) {
                if (_xhr.readyState == 4) {
                    if (_xhr.status == 200) {
                        let json = eval('(' + _xhr.responseText + ')');
                        /* 成功失败 */
                        if (json.status == 0) opts.success(json)
                        else opts.error(json)
                    }
                }
            }
            _xhr.open("POST", opts.url, true);
            //console.log(_file, opts.files[0])
            formData.append(opts.name || "file", _file);
            _xhr.send(formData);
        };
        
    //  上传的图片大于 300KB 时才压缩
    if (file && (file.size / 1024 > 300)) {
        let cvs = document.createElement('canvas'),
            img = document.createElement('img'),
            reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            let naturalBase64 = e.target.result; //  获取 base64 编码，这是原图的
            img.src = naturalBase64;
            img.onload = function () {
                let ratio = img.naturalWidth / img.naturalHeight; //  获取原图比例,为了等比压缩
                cvs.width = 360;
                cvs.height = cvs.width / ratio;
                let ctx = cvs.getContext('2d');
                ctx.drawImage(img, 0, 0, cvs.width, cvs.height); //  画在 canvas 上
                // 压缩后新图的 base64
                let base64 = cvs.toDataURL(),
                    arr = base64.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                fn(new File([u8arr], "img.png", {
                    type: mime
                }));
            }
        }
    } else fn(file); // 小于300KB 直接上传
}
