<script lang="ts" setup>
import { Chat } from "../utils/chat"
import { useGlobal } from "../logic/Chat"
import { useElementHover } from "@vueuse/core"
import { ref } from "vue"

defineProps<{
  chat: Chat
  selected: boolean
}>()

const Global = useGlobal()
const tabRef = ref<HTMLDivElement>()
const isHover = useElementHover(tabRef)
</script>
<template>
  <div
    ref="tabRef"
    rd-l="4px"
    flex
    justify="between"
    items="center"
    :class="['p-8px', 'cursor-pointer', 'ml-8px', { 'bg-white': selected }]"
    @click="Global.select.value = chat.id"
  >
    <n-ellipsis line-clamp="2" :tooltip="false">
      {{ chat.name }}
    </n-ellipsis>
    <div :class="[!isHover && 'invisible']" @click.stop="null">
      <n-tooltip>
        <template #trigger>
          <n-popconfirm
            positive-text="确认"
            negative-text="取消"
            @positive-click="Global.deleteChat(chat.id)"
          >
            <template #trigger>
              <div
                w="18px"
                h="18px"
                rounded="4px"
                hover="bg-gray-200"
                flex
                items="center"
                justify="center"
              >
                <div text="gray-400" class="i-material-symbols-delete-forever"></div>
              </div>
            </template>
            确认删除该会话？
          </n-popconfirm>
        </template>
        删除会话
      </n-tooltip>
    </div>
  </div>
</template>
