<script setup lang="ts">
import { avatar, Message } from "../utils/chat"
import { computed, ref } from "vue"
import { useElementHover } from "@vueuse/core"
import { markdown } from "../utils/markdown"
import { useGlobal } from "../logic/Chat"

const props = defineProps<{
  chatId: string
  message: Message
}>()
const html = computed(() => {
  if (props.message.content == null) return ""
  return markdown(props.message.content)
})
const showSource = ref(false)
const container = ref<HTMLDivElement>()
const hover = useElementHover(container)
const ops = computed<
  { icon: string; tips: string; size: string; color?: string; onClick: () => void }[]
>(() => {
  return [
    {
      icon: "i-bi-filetype-raw",
      tips: "查看原文",
      size: "text-14px",
      onClick: () => {
        showSource.value = true
      }
    },
    props.message.disable
      ? {
          icon: "i-material-symbols-open-in-full-rounded",
          tips: "启用此消息",
          size: "text-16px",
          onClick: () => {
            props.message.disable = false
          }
        }
      : {
          icon: "i-fluent-subtract-12-filled",
          tips: "禁用此消息",
          size: "text-18px",
          onClick: () => {
            props.message.disable = true
          }
        },
    {
      icon: "i-material-symbols-delete-forever",
      tips: "删除消息",
      size: "text-18px",
      onClick: () => {
        Global.deleteMessage(props.chatId, props.message.id)
      }
    }
  ]
})
const Global = useGlobal()
</script>
<template>
  <div ref="container" class="flex p-8px hover:bg-gray-100 rd-8px">
    <div class="mr-8px" flex items="start" justify="center">
      <n-avatar :src="avatar[message.role]" size="small" />
    </div>
    <div class="flex-1 flex">
      <div v-if="message.disable" py="5px" px="8px" color="gray-400">此消息已禁用</div>
      <div
        v-else-if="message.content != null"
        py="5px"
        px="8px"
        rd="4px"
        break-all
        h="max"
        class="markdown"
        :class="[message.role === 'user' && 'bg-dark-50 color-light-50']"
        v-html="html"
      ></div>
      <n-spin v-else ml="8px" size="small"></n-spin>
    </div>
    <div class="shrink-0 ml-8px">
      <div
        :class="[!hover && 'invisible']"
        rd="4px"
        flex
        border="1px solid gray200"
        overflow="hidden"
      >
        <template v-for="(v, i) in ops" :key="i">
          <div v-if="i !== 0" w="1px" bg="gray-200" />
          <n-tooltip>
            <template #trigger>
              <div
                w="20px"
                h="20px"
                flex
                items-center
                justify-center
                hover="bg-gray200"
                cursor="pointer"
                @click.prevent.stop="v.onClick"
              >
                <div :class="[v.icon, 'text-gray-400', v.size]"></div>
              </div>
            </template>
            <span>{{ v.tips }}</span>
          </n-tooltip>
        </template>
      </div>
    </div>
    <n-modal v-model:show="showSource" closable close-on-esc mask-closable>
      <n-card w="800px">
        <template #header>
          <div flex></div>
        </template>
        <div max-h="80vh" overflow="scroll" whitespace="pre-wrap" break="all">
          {{ message.content }}
        </div>
      </n-card>
    </n-modal>
  </div>
</template>
<style lang="scss">
.markdown {
  p {
    padding: 0;
    margin: 0;
  }

  ol,
  ul {
    margin: 0;
  }

  pre {
    padding: 4px 8px !important;
    margin: 4px 0 !important;
    border-radius: 4px;
  }
}
</style>
