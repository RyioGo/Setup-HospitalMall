import { App } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "animate.css";
import loading from "@/directive/loading";

import "@/style.less";

class PluginClient {
  constructor(app: App) {
    app.use(Antd);

    app.use(loading);
  }
}

export default PluginClient;
