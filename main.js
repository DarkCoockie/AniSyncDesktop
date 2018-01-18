const electron = require( "electron" );
const { app, BrowserWindow } = electron;

const path = require('path')
const url = require('url')

let mainWindow = null;

app.on( "window-all-closed", () => {
    if ( process.platform !== "darwin" ) {
        app.quit();
    }
} );

app.on( "ready", function() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1280, height: 720,
        frame: false,
        backgroundColor: '#212121',
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/hmtl/index.html' ),
        protocol: 'file',
        slashe: true
    }));
    mainWindow.once( "ready-to-show", () => {
        mainWindow.show();
    } );
    mainWindow.webContents.openDevTools();
    mainWindow.on( "closed", function() {
        mainWindow = null;
    } );

    let modal = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false
    });
    modal.loadURL('https://github.com');
    modal.once( "ready-to-show", () => {
        modal.show();
    } );
    modal.on( "closed", function() {
        modal = null;
    } );
});

