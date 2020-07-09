## 不使用拍照控件的情况

WXML 宽和高动态控制

		    <canvas canvas-id="micro" style="width:{{w}}rpx;height: {{h}}rpx" class="canvas"></canvas>


WXSS 让它不可见

        .canvas {
		       position: fixed;
		       z-index: -1;
	      }
        
js 选择图片


        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                const tempFilePaths = res.tempFilePaths;
                tinyImg(tempFilePaths[0]);
                wx.showLoading({
                    title: "正在上传",
                    mask: true
                });
            },
            error: function (e) { // 调试很有必要
                console.log(e);
            }
        });
 
canvas压缩图片

        tinyImg = (file) => {
            let context = wx.createCanvasContext('micro'),
                _self = this,
                w = screen.windowWidth; //wx.getSystemInfo 获取 压缩图片宽度和设备屏幕一致
            wx.getImageInfo({ //读取图片信息
                src: file,
                success: function (res2) {
                    let h = Math.floor(w * res2.height / res2.width);  // 计算比例高度
                    _self.w = w * 2;
                    _self.hh = h * 2;
                    context.drawImage(file, 0, 0, w, h);
                    context.draw(true);
                    setTimeout(() => { // 延迟半秒
                        wx.canvasToTempFilePath({
                            quality: 1, //高质量
                            canvasId: 'micro',
                            destWidth: w,
                            destHeight: h,
                            success(res) {
                                console.log(res.tempFilePath) // 上传这个就欧了
                                context.clearRect(0, 0, w, h);  //清空画布 好像没啥用
                            },
                            fail(err) {
                                console.log(err)
                            }
                        }, _self);
                    }, 5e2);
                }
            });
        }



