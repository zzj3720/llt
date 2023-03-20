<script setup lang="ts">
import { GlobalThemeOverrides, NConfigProvider } from "naive-ui"
import ChatPage from "./components/ChatPageView.vue"

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: "12px",
    fontSizeSmall: "12px",
    baseColor: "#FFF",
    primaryColor: "#292929FF",
    primaryColorHover: "#525252FF",
    infoColor: "#A3A3A3FF",
    primaryColorPressed: "#292929FF",
    primaryColorSuppl: "#292929FF",
    infoColorHover: "#CCCCCCFF",
    infoColorPressed: "#A3A3A3FF",
    infoColorSuppl: "#A3A3A3FF",
    placeholderColor: "rgba(147, 147, 147, 1)",
    successColor: "#00E86DFF",
    successColorHover: "#47FF9DFF",
    successColorPressed: "#00E86DFF",
    successColorSuppl: "#00E86DFF",
    warningColor: "#FFBC51FF",
    warningColorHover: "#FFD797FF",
    warningColorPressed: "#FFBC51FF",
    warningColorSuppl: "#FFBC51FF",
    errorColor: "#FF484BFF",
    errorColorHover: "#FF9193FF",
    errorColorPressed: "#FF484BFF",
    errorColorSuppl: "#FF484BFF"
  },
  Tooltip: {
    padding: "2px 6px"
  },
  Spin: {
    sizeTiny: "10px",
    sizeSmall: "12px",
    sizeMedium: "14px",
    sizeLarge: "18px"
  }
} as GlobalThemeOverrides
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <ChatPage></ChatPage>
  </n-config-provider>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
