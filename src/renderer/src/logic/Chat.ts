import { computed, inject, onMounted, onUnmounted, provide, reactive, ref } from "vue"
import { Chat, chatCompletion, GPTModel, Message } from "../utils/chat"
import { nanoid } from "nanoid"
import { RemovableRef, useStorageAsync } from "@vueuse/core"
import { isDev } from "../utils/isDev"

export const useGlobal = (): ReturnType<typeof provideGlobal> => {
  return inject("global-data") as any
}
type GlobalConfig = {
  defaultModel: GPTModel
  defaultTopN: number
  apiKey: string
}
const defaultGlobalConfig: GlobalConfig = {
  defaultModel: "gpt-3.5-turbo",
  defaultTopN: 1,
  apiKey: ""
}
export const provideGlobal = () => {
  const chats: RemovableRef<Chat[]> = useStorageAsync(
    "chats",
    !isDev
      ? []
      : [
          {
            id: nanoid(),
            name: "test",
            messages: [
              { id: nanoid(), role: "user", content: "教我点英语" },
              {
                id: nanoid(),
                role: "assistant",
                content:
                  "当然，这里还有更多的英语短语和表达方式： \n" +
                  "\n" +
                  "1. 问路：\n" +
                  "\n" +
                  "- Excuse me, can you tell me how to get to the nearest subway station? 对不起，请问最近的地铁站怎么走？\n" +
                  "- Is there a bus that goes to the city center from here? 这里有去市中心的公交车吗？\n" +
                  "- Could you give me directions to the museum, please? 能告诉我博物馆怎么走吗？\n" +
                  "\n" +
                  "2. 点餐：\n" +
                  "\n" +
                  "- I'd like a table for two, please. 我想要一张两人桌。\n" +
                  "- What do you recommend on the menu? 菜单上你推荐什么？\n" +
                  "- Can I have my steak medium rare, please? 我可以点个五分熟的牛排吗？\n" +
                  "- Could we have separate checks, please? 可以分开结账吗？\n" +
                  "\n" +
                  "3. 时间和日期：\n" +
                  "\n" +
                  "- What time is it now? 现在几点了？\n" +
                  "- It's half past nine in the morning. 上午九点半。\n" +
                  "- When is your birthday/anniversary/holiday/vacation/etc.? 你的生日/纪念日/假期/度假等是什么时候？\n" +
                  "\n" +
                  "4. 表示喜欢或不喜欢：\n" +
                  "\n" +
                  "- I love/hate sushi/chocolate/coffee/etc. 我喜欢/讨厌寿司/巧克力/咖啡等。\n" +
                  "- This movie/book/song is amazing/boring/funny/etc.! 这部电影/书籍/歌曲很棒无聊好笑等！\n" +
                  "\n" +
                  "希望这些英语短语能够对您有所帮助！"
              },
              {
                id: nanoid(),
                role: "assistant",
                content:
                  "下面是一段包含代码的Markdown示例：\n" +
                  "\n" +
                  "```python\n" +
                  "def fibonacci(n):\n" +
                  "    if n <= 1:\n" +
                  "        return n\n" +
                  "    else:\n" +
                  "        return (fibonacci(n-1) + fibonacci(n-2))\n" +
                  "\n" +
                  "# 输出斐波那契数列前10项\n" +
                  "for i in range(10):\n" +
                  "    print(fibonacci(i))\n" +
                  "```\n" +
                  "\n" +
                  "这段代码使用Python编写，实现了一个递归函数来计算斐波那契数列。然后通过循环输出前10项的结果。\n" +
                  "\n" +
                  "在Markdown中，可以使用三个反引号（`）将代码块括起来，并指定语言类型（例如上述示例中的Python）。这样可以使得代码更加易读和美观。" +
                  "下面是一段包含代码的Markdown示例：\n" +
                  "\n" +
                  "```python\n" +
                  "def fibonacci(n):\n" +
                  "    if n <= 1:\n" +
                  "        return n\n" +
                  "    else:\n" +
                  "        return (fibonacci(n-1) + fibonacci(n-2))\n" +
                  "\n" +
                  "# 输出斐波那契数列前10项\n" +
                  "for i in range(10):\n" +
                  "    print(fibonacci(i))\n" +
                  "```\n" +
                  "\n" +
                  "这段代码使用Python编写，实现了一个递归函数来计算斐波那契数列。然后通过循环输出前10项的结果。\n" +
                  "\n" +
                  "在Markdown中，可以使用三个反引号（`）将代码块括起来，并指定语言类型（例如上述示例中的Python）。这样可以使得代码更加易读和美观。" +
                  "下面是一段包含代码的Markdown示例：\n" +
                  "\n" +
                  "```python\n" +
                  "def fibonacci(n):\n" +
                  "    if n <= 1:\n" +
                  "        return n\n" +
                  "    else:\n" +
                  "        return (fibonacci(n-1) + fibonacci(n-2))\n" +
                  "\n" +
                  "# 输出斐波那契数列前10项\n" +
                  "for i in range(10):\n" +
                  "    print(fibonacci(i))\n" +
                  "```\n" +
                  "\n" +
                  "这段代码使用Python编写，实现了一个递归函数来计算斐波那契数列。然后通过循环输出前10项的结果。\n" +
                  "\n" +
                  "在Markdown中，可以使用三个反引号（`）将代码块括起来，并指定语言类型（例如上述示例中的Python）。这样可以使得代码更加易读和美观。"
              }
            ],
            model: "gpt-3.5-turbo"
          }
        ],
    localStorage,
    { deep: true }
  )
  const select = ref<string>()
  const getChat = (id: string) => {
    return computed(() => chats.value.find((chat) => chat.id === id))
  }
  const getAnswer = (id: string, currentMessages: Message[]): Promise<void> =>
    new Promise<void>((res, rej) => {
      const chat = chats.value.find((v) => v.id === id)
      if (!chat) {
        return
      }
      if (chat.abort) {
        return rej()
      }
      chat.abort = new AbortController()
      const message: Message = reactive({
        id: nanoid(),
        role: "assistant",
        content: undefined
      })
      chatCompletion(
        config.value.apiKey,
        currentMessages,
        { model: chat.model },
        (msg, end) => {
          message.content = (message.content ?? "") + msg
          if (end) {
            chat.abort = undefined
            res()
          }
        },
        () => {
          chat.abort = undefined
          rej()
        },
        chat.abort.signal
      )
      chat.messages.push(message)
    })

  const getTitle = (id: string, currentMessages: Message[]) => {
    const chat = chats.value.find((v) => v.id === id)
    if (!chat) {
      return
    }
    let content = ""
    chatCompletion(
      config.value.apiKey,
      [
        {
          id: nanoid(),
          role: "user",
          content: `把\n${currentMessages
            .map((v) => v.content)
            .join(
              "\n"
            )}\n总结为十字以内字数尽量少的中文标题，除了标题不要回复任何多余的字，不要有引号`
        }
      ],
      { model: chat.model },
      (msg, end) => {
        chat.name = content += msg
      },
      () => {
        //
      }
    )
  }
  const config = useStorageAsync<GlobalConfig>("global-config", defaultGlobalConfig, localStorage, {
    deep: true
  })
  onMounted(() => {
    window.electron.ipcRenderer.on("api.newChat", (event, text) => {
      Global.newChat({
        id: nanoid(),
        name: "与 ChatGPT 聊天",
        messages: [{ id: nanoid(), role: "user", content: text }],
        model: "gpt-3.5-turbo"
      })
    })
  })
  onUnmounted(() => {
    window.electron.ipcRenderer.removeAllListeners("api.newChat")
  })
  const Global = {
    chats,
    select,
    getChat,
    setSelect(id: string | undefined) {
      select.value = id
    },
    updateChat(id: string, update: (chat: Chat) => void) {
      const chat = chats.value.find((v) => v.id === id)
      if (chat) {
        update(chat)
      }
    },
    async newChat(chat: Chat) {
      chats.value.unshift(reactive(chat))
      select.value = chat.id
      await getAnswer(chat.id, chat.messages)
      getTitle(chat.id, chat.messages)
    },
    getAnswer,
    getTitle,
    deleteChat(id: string) {
      chats.value = chats.value.filter((v) => v.id !== id)
      select.value = undefined
    },
    deleteAllChat() {
      chats.value = []
    },
    regen(id: string) {
      const chat = chats.value.find((v) => v.id === id)
      if (!chat) {
        return
      }
      chat.messages.pop()
      return getAnswer(chat.id, chat.messages)
    },
    config,
    deleteMessage(chatId: string, messageId: string) {
      const chat = chats.value.find((v) => v.id === chatId)
      if (chat) {
        chat.messages = chat.messages.filter((v) => v.id !== messageId)
      }
    }
  }
  provide("global-data", Global)
  return Global
}
