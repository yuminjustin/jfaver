# jfaver
#我的常用方法集合
把自己常用的一些方法和经验集合起来，本次不提供源码了，只是我自己平时的积累，网上有很多，只不过我是把它们放在了一起，而且后续会持续往里面加内容，不依赖其他类库。（jfaver文件要放在body结束符前，不要放在head中）
### [2015-10-16](#13) update 增加了13-15 三个新工具
### 2015-4-29 1-12 共12个工具
### 提供的方法有：
[1](#1)、异步加载一个js文件；<br>
[2](#2)、避免缓存模式的load方法；<br>
[3](#3)、预加载图片；<br>
[4](#4)、产生随机数；<br>
[5](#5)、判断浏览器；<br>
[6](#6)、判断设备；<br>
[7](#7)、css3动画结束；<br>
[8](#8)、css3过渡结束；<br>
[9](#9)、存储html5方式或者cookie；<br>
[10](#10)、合并两个对象（一维）；<br>
[11](#11)、删除某个数组元素；<br>
[12](#12)、继承；<br>
[13](#13)、时间戳格式化；<br>
[14](#14)、对象转成string；<br>
[15](#15)、获取url后面的挂参；<br>
### 以下是详细使用方法：
### 1
    异步加载一个js文件
          j.require("jfaver.loading.js", function (o) {
             /*第一个参数是需要加载的js文件地址*/
             /*第二个参数是回调函数，o为返回值，是个对象，可选择使用*/
             /*o含有两个属性，target和status*/
             /*target表示所加载的script对象*/
             /*status表示状态 一般为1*/
         });
### 2
    避免缓存模式的load方法
         j.load(object, function (o) {
           /*第一个参数是需要绑定load事件的对象*/
          /*第二个参数功能同第一点*/
           /*target表示你所传入的object对象*/
        });
### 3
    预加载图片
        j.requireIMG(url, function (o) {
            /*此方法跟load方法类似，load也可以做图片预加载，但是第一个参数需要是对象*/
           /*此方法第一个对象是图片url*/
           /*第二个参数功能同第一点*/
           /*target表示临时的img对象*/  
        });
### 4
    产生随机数
        j.randomN();
        /*产生0~1之间的随机浮点数，此方法运用在load方法中，平日的开发中也可能会用到，于是就暴露出来*/
### 5
    判断浏览器
        j.browser();
       /*返回值是一个对象，这个对象包含两个值，name和v*/
       /*name：这个值包含两块，这是为以后判断手机浏览器做铺垫
                      an（安卓）、ios、wp（windows phone）、bb（blackberry）、other（其他手机）
                     上面暂时表示手机的浏览器，这些值来自第六个方法。
                    chrome、safari、firefox、ie、ie_spartan（微软最新浏览器）
                    这里的名字对应各大主流浏览器
         v：0,5~12；其实这里表示的是浏览器版本号，对于其他高级浏览器来说他们都会自动升级或者提醒用户升级，这个值主要的作用是来区分IE
               0表示IE以外的浏览器
              5~12表示IE的各个版本
              平常使用css3的时候就可以这么用：
              j.browser().v==0||j.browser().v>9
             其他浏览器的和高级版的IE（10+） 
       */
### 6
    判断设备
        j.divce();
       /*返回值同上*/
      /*name：an（安卓）、ios、wp（windows phone）、bb（blackberry）、other（其他手机）、pc
          v：0、1   0表示移动设备，1表示pc
     */
### 7
    css3动画结束
         j.animatend(object, function () {
               /*两个参数 第一个是需要绑定事件的对象，第二个是回调*/
         });
### 8
    css3过渡结束
         j.transitionend(object, function () {
           /*两个参数 第一个是需要绑定事件的对象，第二个是回调*/
        });
### 9
    存储
         /*sessionStorage*/
         j.storage.setSession(name,value); /*设置*/
         j.storage.getSession(name);/*获取*/
         j.storage.fixSession(name,value);/*修改*/
         j.storage.delSession(name);/*删除*/
         j.storage.disSession();/*全部清除*/
         /*localStorage*/
         j.storage.setLoacl(name,value);/*设置*/
         j.storage.getLoacl(name);/*获取*/
         j.storage.fixLoacl(name,value);/*修改*/
         j.storage.delLoacl(name);/*删除*/
         j.storage.disLoacl();/*全部清除*/
         /*cookie*/
         j.storage.setCookie(name,value,day);/*设置*/
         j.storage.getCookie(name);/*获取*/
         j.storage.fixCookie(name,value,day);/*修改*/
         j.storage.delCookie(name);/*删除*/
### 10
    合并两个对象（一维）
        var test = j.concat(object1, object2,status);
        /*后续将充实为多维的，目前此方法为一维*/
        /*此方法修改传入的两个对象，返回值是新的对象，将object2当中的属性添加到object1当中，不同的属性将直接写入，【有相同的属性】时候操作方式如下：*/
        /*status相同属性的合并方式，可选，默认为0*/
        /*默认，object2的值将会替换到object1*/
        /*1，object2的值不会替换到object1，object1不变*/
        /*2，object2和object1的值都保留，object1的属性名称将变更为xx_o*/
        /*3，直接删除相同属性*/
### 11
    删除某个数组元素
        var arr = [1, 2, 3, 8, 5];
         j.arrRemove(arr, 3);
        /*首先它将会去找该数组是否有3这个值，有将直接删除，任务结束
           若无它将会再次运行去删除角标为3的元素，任务结束
           若都没有，任务结束，数组无变化 */
### 12
    继承
         var afn = function (){
                this.test =function(i,j){
                   console.log(i+j);
               }
         }
        var bfn = function(){
              j.extend(afn,this);
         /*
             第一个参数是父类，第二个是子类
            使用该方法后，子类将拥有父类的成员方法
           */
        }
### 13
    时间戳格式化
        var datetime = j.formatDate(1444880942000);
        结果：2015-10-15 11:49:2
### 14
    对象转成string
        var data= j.O2S({a:1,b:2});
        结果："{"a":1,"b":2}"
### 15
    获取url后面的挂参
        var data = j.getDataFormUrl("https://www.baidu.com/s?ie=UTF-8&tn=93899312_hao_pg&wd=apple")
        结果： {ie: "UTF-8", tn: "93899312_hao_pg", wd: "apple"}  
        填入链接可选，不填直接去拆分当前的location.href
### 衍生类loading加载层，依赖jfaver
          /*配置*/
        var loading = new j.loading({
              target: document.getElementById("loadingTest"), 
              /*需要添加loading层的对象 默认是document.body*/
              color: "rgba(0,0,0,0.5)",/*loading层的背景*/
              type: "progress",/*loading层的样式 circle（默认） 或者progress*/
              /*circle旋转的圆圈 progress进度条*/
             blur: 1, /*是否需要模糊背景 可选 默认 0*/
             fixed: 0, /*是否是固定的 可选 默认 0*/
             contentWords: "玩命加载中...", /*文本信息 可选 默认为空 为空不显示文字*/
             contentColor: "#fff", /*文本颜色 可选*/
             contentFontSize: "18px",/*文本大小 可选*/
             open: function () { /*打开回调*/
              },
              close: function () { /*关闭回调*/
             }
          });
    /*使用*/
    loading.trunOn(); /*展现loading*/
    loading.trunOff(); /*关闭loading*/
