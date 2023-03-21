<script lang="ts" setup>
import { ref } from "vue"
import { connect } from "./utils/connect"
import { useEventListener } from "@vueuse/core"

const blur = () => {
  setTimeout(() => {
    textRef.value?.focus()
  })
}
const keydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    esc()
    return
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    send()
    return
  }
}
const esc = () => {
  connect.closeSearch()
}
const send = () => {
  connect.openMain(text.value)
}
const text = ref("")
const textRef = ref<HTMLInputElement>()
useEventListener(window, "visibilitychange", () => {
  if (document.visibilityState === "visible") {
    textRef.value?.focus()
    textRef.value?.select()
  }
})
</script>
<template>
  <div class="wrapper">
    <n-input
      ref="textRef"
      v-model:value="text"
      placeholder="输入要处理的文本"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 20 }"
      @keydown="keydown($event)"
      @blur="blur()"
    >
      <template #suffix>
        <span text="gray-400">⏎</span>
      </template>
    </n-input>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 8px;
  box-sizing: border-box;
}

input {
  width: 100%;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
