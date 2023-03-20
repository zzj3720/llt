import { createParser } from "eventsource-parser"
import gpt from "./gpt.png"

export const models = ["gpt-3.5-turbo", "gpt-3.5-turbo-0301"] as const
export type GPTModel = (typeof models)[number]
export type ChatOps = {
  temperature?: number
  model?: GPTModel
  abort?: AbortSignal
}
export type UserRole = "user" | "assistant" | "system"
export type Message = {
  id: string
  disable?: boolean
  content: string | undefined
  role: UserRole
  totalTime?: number
}

interface FetchSSEOptions extends RequestInit {
  onMessage(data: string): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError(error: any): void
}

export async function* streamAsyncIterable(stream: ReadableStream<Uint8Array> | null) {
  if (!stream) {
    return
  }
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        return
      }
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}

export async function fetchSSE(input: string, options: FetchSSEOptions) {
  const { onMessage, onError, ...fetchOptions } = options
  try {
    const resp = await fetch(input, fetchOptions)
    if (resp.status !== 200) {
      onError(await resp.json())
      return
    }
    const parser = createParser((event) => {
      if (event.type === "event") {
        onMessage(event.data)
      }
    })
    if (!resp.body) {
      return
    }
    for await (const chunk of streamAsyncIterable(resp.body)) {
      const str = new TextDecoder().decode(chunk)
      parser.feed(str)
    }
  } catch (e) {
    onError(e)
  }
}

export const chatCompletion = (
  apiKey: string,
  msgs: Message[],
  opt: ChatOps,
  onMessage: (data: string, end: boolean) => void,
  onError: (msg: unknown) => void,
  signal?: AbortSignal
) => {
  fetchSSE(`https://api.openai.com/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    signal,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      top_p: 0.001,
      frequency_penalty: 1,
      presence_penalty: 1,
      max_tokens: 2048,
      ...opt,
      messages: msgs
        .filter((v) => !v.disable)
        .map((v) => ({
          role: v.role,
          content: v.content
        })),
      stream: true
    }),
    onMessage: (data: string) => {
      try {
        if (data === "[DONE]") {
          return
        }
        const resp = JSON.parse(data)
        const { choices } = resp
        if (!choices || choices.length === 0) {
          return
        }
        const { delta, finish_reason: finishReason } = choices[0]
        const content = delta.content
        if (finishReason) {
          onMessage(content ?? "", true)
          return
        } else {
          onMessage(content ?? "", false)
        }
      } catch (e) {
        console.log(e)
        onError(e)
      }
    },
    onError(error: any) {
      console.log(error)
      onError(error)
    }
  })
}

export const avatar = {
  user: "",
  assistant: gpt
}

export type Chat = {
  id: string
  name: string
  messages: Message[]
  model: GPTModel
  abort?: AbortController
}
