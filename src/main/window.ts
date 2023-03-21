import { BrowserWindow } from "electron"
import { createMainWindow } from "./createMainWindow"
import { createSearchWindow } from "./createSearchWindow"

type WindowConfig = {
  window?: BrowserWindow
  create: () => BrowserWindow;
}
export const windows: {
  mainWindow: WindowConfig;
  searchWindow: WindowConfig
} = {
  mainWindow: {
    create: createMainWindow
  },
  searchWindow: {
    create: createSearchWindow
  }
}
export const getWindow = (name: keyof typeof windows): BrowserWindow => {
  const win = windows[name]
  if (!win.window) {
    win.window = win.create();
  }
  return win.window;
}
