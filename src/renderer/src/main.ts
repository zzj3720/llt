import { createApp } from "vue"
import App from "./App.vue"
import "./utils/prism-material-light.css"
import "uno.css"
import {
  // create naive ui
  create,
  NAvatar,
  // component
  NButton,
  NCard,
  NDivider,
  NEllipsis, NFormItem,
  NIcon,
  NInput,
  NModal,
  NPopconfirm,
  NSelect,
  NSlider,
  NSpin,
  NTooltip
} from "naive-ui"

const naive = create({
  components: [
    NButton,
    NInput,
    NAvatar,
    NSpin,
    NDivider,
    NIcon,
    NTooltip,
    NModal,
    NCard,
    NPopconfirm,
    NSelect,
    NSlider,
    NEllipsis,
    NFormItem,
  ]
})
createApp(App).use(naive).mount("#app")
