import { declare } from "./declare"
import { getWindow } from "./window"
import { app } from "electron"

export const connect = declare({
  openMain: async (text: string) => {
    const mainWindow = getWindow("mainWindow")
    mainWindow.show()
    getWindow("searchWindow").hide()
    mainWindow.webContents.send("api.newChat", text)
  },
  closeSearch: async () => {
    app.hide();
  }
})
export type Connect = typeof connect;
