import { createApp } from "vue";
import App from "./App.vue";

import PluginClient from "@/libs/PluginClient";
import router from "./router/tools";
import store from "./store";

const app = createApp(App);
// 激活插件
new PluginClient(app);

app.use(router).use(store);
app.mount("#app");
