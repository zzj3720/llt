import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
// import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import rehypePrism from "@mapbox/rehype-prism"
const unifiedInstance = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(remarkGfm)
  .use(rehypePrism)
  // .use(rehypeSanitize)
  .use(rehypeStringify)
export const markdown = (text: string) => unifiedInstance.processSync(text).toString()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.markdown = markdown
