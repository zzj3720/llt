import { ipcMain } from "electron"

export const declare = <T extends Record<string, (...args: any[]) => Promise<any>>>(map: T) => {
  Object.entries(map).forEach(([key, func]) => {
    ipcMain.handle(`api.${key}`, (event, ...args) => {
      return func(...args)
    })
  })
  return map;
}
