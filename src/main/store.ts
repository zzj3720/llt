import { ipcMain } from "electron"
import Store from "electron-store"

const store = new Store({})
store.store
ipcMain.on("setStore", (event, key: string, value: any) => {
  store.set(key, value)
})
ipcMain.on("getStore", (event, key: string) => {
  return store.get(key)
})
ipcMain.on("getStoreSync", (event, key) => {
  event.returnValue = store.get(key)
})
