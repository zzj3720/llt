import { ref, toRaw } from "vue"

const getValue = <T>(key: string, defaultValue: T) => {
  const data = window.electron.ipcRenderer.sendSync("getStoreSync", key)
  if (!data) {
    window.electron.ipcRenderer.send("setStore", key, defaultValue)
    return defaultValue
  }
  return data
}
const setValue = <T>(key: string, value: T) => {
  window.electron.ipcRenderer.send("setStore", key, toRaw(value))
}
export const configRef = <T>(key: string, defaultValue) => {
  const data = ref(getValue(key, defaultValue))
  return {
    data,
    save: () => {
      setValue(key, data.value)
    }
  }
}
