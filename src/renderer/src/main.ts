import { createApp } from "vue"
import AppView from "./AppView.vue"
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
  NEllipsis,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NPopconfirm,
  NSelect,
  NSlider,
  NSpin,
  NTooltip
} from "naive-ui"
import { createRouter, createWebHashHistory } from "vue-router"
import SearchView from "./SearchView.vue"
import { template } from "lodash"
import EnterView from "./EnterView.vue"

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
    NFormItem
  ]
})

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: AppView },
    { path: "/search", component: SearchView },
    { path: "/*", component: AppView }
  ] // short for `routes: routes`
})
createApp(EnterView).use(naive).use(router).mount("#app")
