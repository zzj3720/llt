<script lang="ts" setup>
import ChatView from "./ChatView.vue"
import DefaultChatView from "./DefaultChatView.vue"
import { provideGlobal } from "../logic/Chat"
import ChatTabView from "./ChatTabView.vue"

const Global = provideGlobal()
const { chats, select } = Global
</script>
<template>
  <div flex justify="center" h="100vh" bg="gray-100">
    <div class="w-200px shrink-0" flex-col flex>
      <div class="m-8px">
        <n-button
          type="primary"
          :class="{ 'btn-secondary-light': true, 'w-full': true }"
          @click="select = undefined"
        >
          新聊天
        </n-button>
      </div>
      <div flex="1" overflow-y="scroll" overflow-x="hidden">
        <chat-tab-view
          v-for="chat in chats"
          :key="chat.id"
          :chat="chat"
          :selected="chat.id === select"
        ></chat-tab-view>
      </div>
      <div shrink="0" flex flex-col p="8px">
        <n-popconfirm
          positive-text="确认"
          negative-text="取消"
          @positive-click="Global.deleteAllChat()"
        >
          <template #trigger>
            <n-button mb="8px">清除所有会话</n-button>
          </template>
          确认清除所有会话？
        </n-popconfirm>
        <n-button>全局设置</n-button>
      </div>
    </div>
    <div class="overflow-hidden" w="800px" bg="white">
      <ChatView v-if="select != null" :id="select" :key="select"></ChatView>
      <DefaultChatView v-else></DefaultChatView>
    </div>
  </div>
</template>
