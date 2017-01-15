// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
const app = electron.app;
const remote = electron.remote;
const fs = require('fs');
const canvasBuffer = require('electron-canvas-to-buffer')

window.onload = function () {
    if (process.platform == 'win32') {
        // set static icon
        //var mainWindow = remote.getCurrentWindow()
        //mainWindow.setOverlayIcon(__dirname+'/icon.png', "icon");

        // set dynamic icon
        var text = "10";
        //1
        var canvas = document.createElement("canvas");

        canvas.height = 140;
        canvas.width = 140;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        if (text.length > 2) {
            ctx.font = "75px sans-serif";
            ctx.fillText("" + text, 70, 98);
        } else if (text.length > 1) {
            ctx.font = "100px sans-serif";
            ctx.fillText("" + text, 70, 105);
        } else {
            ctx.font = "125px sans-serif";
            ctx.fillText("" + text, 70, 112);
        }

        var buffer = canvasBuffer(canvas, 'image/png')
        var iconSavePath = remote.app.getPath('temp')+ '/gen_icon.png'
        console.log(iconSavePath)
        fs.writeFileSync(iconSavePath, buffer);
        
        var mainWindow = remote.getCurrentWindow()
        mainWindow.setOverlayIcon(iconSavePath, "icon")
    }
}