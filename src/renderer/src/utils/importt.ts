export const importt = <T>(value: T): T => {
  return new Proxy(
    {},
    {
      get(target: unknown, key: string): any {
        return (...args) => {
          return window.electron.ipcRenderer.invoke(`api.${key}`, ...args)
        }
      }
    }
  ) as any
}
