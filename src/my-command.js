import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')

export default function() {
  const options = {
    identifier: 'unique.id',
    width: 1600,
    height: 1200,
    // frame: false,
    titleBarStyle: 'hidden',
    show: false
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL('http://parkerhendo.com')
}
