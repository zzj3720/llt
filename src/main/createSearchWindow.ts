import { join } from "path"
import { is } from "@electron-toolkit/utils"
import { app, BrowserWindow, globalShortcut, shell } from "electron"
import icon from "../../resources/icon.png?asset"
import { getWindow } from "./window"

export const createSearchWindow = (): BrowserWindow => {
  // Create the browser window.
  const searchWindow = new BrowserWindow({
    width: 800,
    height: 670,
    resizable: false,
    show: true,
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  })
  const show = () => {
    getWindow('mainWindow').hide()
    searchWindow.setVisibleOnAllWorkspaces(true)
    searchWindow.show()
  }
  const hidden = () => {
    app.hide()
  }
  // createSearchWindow.on("blur", () => {
  //   console.log("blur", createSearchWindow.isVisible())
  //   createSearchWindow.hide()
  // })
  globalShortcut.register("option+space", () => {
    if (searchWindow.isVisible()) {
      hidden()
    } else {
      show()
    }
  })
  searchWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    searchWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "#/search")
  } else {
    searchWindow.loadFile(join(__dirname, "../renderer/index.html#/search"))
  }
  return searchWindow
}
