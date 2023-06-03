const { app, BrowserWindow } = require("electron");
const { isDev } = require("electron-is-dev");
const path = require("path");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: !app.isPackaged
        },
    })
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
}
app.on('ready', createWindow);


app.on("window--all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit()
    }

})
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})