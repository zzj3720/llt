<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { nanoid } from "nanoid"
import { useGlobal } from "../logic/Chat"
import { Chat, models } from "../utils/chat"

const text = ref("")
const Global = useGlobal()
const config = Global.config
function sendMessage() {
  if (text.value) {
    Global.newChat({
      id: nanoid(),
      name: "与 ChatGPT 聊天",
      messages: [{ id: nanoid(), role: "user", content: text.value }],
      model: "gpt-3.5-turbo-0301"
    } as Chat)
    text.value = ""
  }
}

const inputRef = ref<HTMLDivElement>(null)
onMounted(() => {
  inputRef.value.focus()
})
</script>
<template>
  <div class="flex flex-col h-100% w-100% p-12px box-border">
    <div class="flex-1" overflow="scroll" flex items="center" justify="center">
      <div>
        <n-form-item label="apiKey">
          <n-input
            v-model:value="config.apiKey"
            type="password"
            w="200px"
            placeholder="输入 apiKey"
            size="small"
          >
          </n-input>
        </n-form-item>
        <n-form-item label="模型">
          <n-select
            v-model:value="config.defaultModel"
            w="200px"
            placeholder="选择模型"
            size="small"
            :options="models.map((v) => ({ label: v, value: v }))"
          >
          </n-select>
        </n-form-item>
      </div>
    </div>
    <div flex>
      <n-input
        ref="inputRef"
        v-model:value.trim="text"
        type="textarea"
        size="small"
        :resizable="false"
        width="100%"
        :autosize="{
          minRows: 1,
          maxRows: 15
        }"
        placeholder="输入你想说的"
        @keydown.exact.enter.prevent="sendMessage"
      />
      <NButton size="small" auto ml="8px" @click="sendMessage"> 发送⏎</NButton>
    </div>
  </div>
</template>
