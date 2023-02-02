## electron 笔记
####  1.防止启动多个实例

    const { app, BrowserWindow } = require  ("electron");
    const path = require("path");
    let win = null;
    const createWindow = () => {
        win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
            },
        });
        win.on("close", () => {
            win = null;
        });
        win.loadFile("index.html");
    };
    const islock = app.requestSingleInstanceLock();  
    // 此方法的返回值表示你的应用程序实例是否成功取得了锁
    // 说白了，判断这个实例是不是第一个

    if (islock) { // 是
      app.whenReady().then(() => {
        // 创建窗口
        createWindow();
        app.on("activate", () => {
          if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
        // 启动第二实例事件
        app.on("second-instance", (e, c, w) => {
          if (win) {
            // 若已经创建窗口，最小化的情况直接还原
            if (win.isMinimized()) win.restore();
            win.focus();
          }
        });
        app.on("window-all-closed", () => {
          app.quit();
        });
      });
    } else { // 否
      app.quit();
      // 直接退出
    }

####  2.概念
主进程：ipcMain <br/>
       
    ipcMain.on('eventName',Listener)  //绑定事件
    ipcMain.once('eventName',Listener)  //绑定事件 只监听一次
    ipcMain.removeListener('eventName',Listener)  //解绑事件


渲染进程：ipcRenderer

    ipcRenderer.on('eventName',Listener)  //绑定事件
    ipcRenderer.once('eventName',Listener)  //绑定事件 只监听一次
    ipcRenderer.removeListener('eventName',Listener)  //解绑事件
    ipcRenderer.send('eventName',...args) // 向主进程发消息
    ipcRenderer.sendTo(id,'eventName',...args) // 向渲染进程发消息  id为渲染进程id

