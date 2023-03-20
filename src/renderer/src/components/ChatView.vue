<script setup lang="ts">
import { nextTick, onBeforeUpdate, onMounted, ref, watch } from "vue"
import MessageView from "./MessageView.vue"
import { Message } from "../utils/chat"
import { useGlobal } from "../logic/Chat"
import { nanoid } from "nanoid"

const Global = useGlobal()
const props = defineProps<{ id: string }>()
const inputText = ref("")
const chat = Global.getChat(props.id)
const sendMessage = () => {
  if (!chat.value) {
    return
  }
  if (!chat.value.abort && inputText.value.length > 0) {
    const pre = inputText.value
    inputText.value = ""
    const currentMessages: Message[] = [
      ...chat.value.messages,
      { id: nanoid(), role: "user", content: pre }
    ]
    Global.updateChat(props.id, (c) => {
      c.messages = currentMessages
    })
    Global.getAnswer(props.id, currentMessages).catch(() => {
      inputText.value = pre
    })
  }
}

const inputRef = ref<HTMLDivElement>(null)
const messageBoxRef = ref<HTMLDivElement>(null)
onMounted(() => {
  inputRef.value.focus()
  if (messageBoxRef.value) {
    const ele = messageBoxRef.value
    ele.scrollTop = ele.scrollHeight
  }
})
onBeforeUpdate(() => {
  const ele = messageBoxRef.value
  if (ele.scrollHeight - ele.offsetHeight < ele.scrollTop + 80) {
    nextTick(() => {
      ele.scrollTop = ele.scrollHeight - ele.offsetHeight
    })
  }
})
</script>
<template>
  <div v-if="chat" class="flex-1 h-100% w-100% box-border flex justify-center" px="12px">
    <div flex flex-col pb="12px" w="full">
      <div
        text="18px"
        shrink="0"
        py="12px"
        px="8px"
        flex
        items="center"
        font="medium"
        justify="around"
      >
        <input v-model.trim="chat.name" style="border: none; outline: none; width: 100%" />
        <n-tooltip placement="bottom">
          <template #trigger>
            <div hover="bg-gray-200" rounded="4px" p="4px" cursor="pointer">
              <div text="black" class="i-material-symbols-settings-outline-rounded"></div>
            </div>
          </template>
          设置
        </n-tooltip>
      </div>
      <div ref="messageBoxRef" class="flex-1 overflow-y-scroll overflow-x-hidden" text="12px">
        <MessageView v-for="message in chat.messages" :key="message.id" :chat-id="chat.id" :message="message">
        </MessageView>
      </div>
      <div class="flex shrink-0 pt-8px" flex="col">
        <div flex justify="center" mb="8px">
          <n-button v-if="chat.abort" dashed size="tiny" round @click="chat.abort.abort()">
            <n-spin size="small" mr="4px"></n-spin>
            闭嘴
          </n-button>
          <n-button v-else dashed size="tiny" round @click="Global.regen(chat.id)">
            重说一遍
          </n-button>
        </div>
        <div flex>
          <n-input
            ref="inputRef"
            v-model:value.trim="inputText"
            type="textarea"
            placeholder="输入你想说的"
            width="100%"
            size="small"
            :autosize="{
              minRows: 1,
              maxRows: 15
            }"
            :resizable="false"
            @keydown.exact.enter.prevent.stop="sendMessage()"
          />
          <NButton size="small" :loading="chat.abort != null" auto ml="8px" @click="sendMessage()">
            发送⏎
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>
