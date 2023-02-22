// directive/loading/load.ts
import { App, createApp, Directive } from "vue";

import Loader from "@/components/Loader/index.vue";

/**
 * binding.value就是v-load='true'传过来的那个值
 * 如果传过来的值为true 你们就是要展示loading
 * el是当前指令绑定的对象 binding是传过来的值
 */
const loaderDirective: Directive = {
  mounted(el, binding) {
    const app = createApp(Loader);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    if (binding.value) {
      addDom(el);
    }
  },
  updated(el: HTMLElement, binding: any) {
    binding.value ? addDom(el) : delDom(el);
  },
};

function addDom(el: any) {
  el.appendChild(el.instance.$el);
}

function delDom(el: any) {
  el?.removeChild(el.instance.$el);
}

function install(app: App) {
  app.directive("load", loaderDirective);
}

export default install;
