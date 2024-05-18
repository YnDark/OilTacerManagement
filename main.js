// electron基础引入
const { app, BrowserWindow } = require('electron')
// 创建electron窗体函数
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      // 在vue里面要引入electron里面的内容需要用到这俩
      nodeIntegration:true,
      contextIsolation: false
    }
  })
  // 在electron页面中打开调试工具
  win.webContents.openDevTools()
  // 连接到Vue页面
  win.loadURL("http://localhost:8080")
}
// 初始化窗体
app.whenReady().then(() => {
  createWindow()
})
// 证书的链接验证失败时，触发该事件
app.on(
  "certificate-error",
  function (event, webContents, url, error, certificate, callback) {
    event.preventDefault();
    callback(true);
  }
);

