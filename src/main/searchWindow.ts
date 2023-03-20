import { join } from "path"
import { is } from "@electron-toolkit/utils"
import { BrowserWindow, shell } from "electron"
import icon from "../../resources/icon.png"
export const searchWindow = (): void => {
  // Create the browser window.
  const searchWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  })

  searchWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    searchWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    searchWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
}
