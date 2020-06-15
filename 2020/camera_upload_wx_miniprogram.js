/*
  wxml 中要有canvas图片
  xsz_img：判断图片是否拍摄
  <camera mode="normal" device-position="back" flash="auto" binderror="error" style="width: 100%; height: 300rpx;"
      wx:if="{{!xsz_img}}">
      <cover-view class="noticeTXT">文字描述</cover-view>
  </camera>
  <block wx:else>
      <canvas class="xsz_img" canvas-id="micro" style="display:block;width: 100%; height: 300rpx;"></canvas>
  </block>
*/

/* 拍照回调 takePhoto*/
takePhoto = () => {
        /* 直接拍照 */
        const ctx = wx.createCameraContext(),
            _this = this;
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                _this.mmUpload(res.tempImagePath);
            }
        })
}

/* 上传处理 mmUpload*/
mmUpload = (file) => {
        let _this = this,
            context = wx.createCanvasContext('micro'),
            w = screen.screenWidth,  // wx.getMenuButtonBoundingClientRect() 取值来的
            h = 150;  //高度自定义
        this.setData({   // 让页面显示已拍照的图片并显示canvas
            xsz_img: file   
        });
        context.drawImage(file, 0, 0, w, h)  //填充canvas  
        context.draw(true);  //绘制
        setTimeout(() => {
            wx.showLoading({
                title: "正在上传",
                mask: true
            });
            this.setData({
                mloading: !0
            })
            wx.canvasToTempFilePath({  // 变成图片
                quality: 0.8, //图片质量
                canvasId: 'micro',
                destWidth: w,
                destHeight: h,
                success(res) {
                    wx.hideLoading();
                    networks.uploadFile(res.tempFilePath, (res) => {
                        //  成功处理回调
                    }, err => {
                        console.log(err)
                    })
                }
            })
        }, 5e2);
    }





