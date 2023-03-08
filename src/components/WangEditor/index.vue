<script lang="ts">
//  for node_modules api
import { onBeforeUnmount, shallowRef, onMounted, nextTick } from "vue";
import { Setup, Define, PassOnTo, Watch } from "vue-class-setup";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { file_storage } from "@/api/file";

//  for you api
//  for you components

@Setup
class WangEditor extends Define<Props, Emits> {
  // 编辑器实例，必须用 shallowRef
  editorRef: any = shallowRef();
  toolbarConfig = {};
  editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: any) {
          let params = new FormData();
          params.append("file", file);
          // file 即选中的文件
          file_storage(params).then((res) => {
            insertFn(res.data, file.name, res.data);
          });
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
        },
      },
      uploadVideo: {
        // 自定义插入视频
        async customUpload(file: File, insertFn: any) {
          let params = new FormData();
          params.append("file", file);
          // file 即选中的文件
          file_storage(params).then((res) => {
            insertFn(res.data);
          });
        },
      },
    },
  };
  valueHtml = "";

  handleCreated(editor: any) {
    this.editorRef = editor; // 记录 editor 实例，重要！
  }

  @Watch("valueHtml")
  setValueHtml(value: string, oldValue: string) {
    this.$emit("update:value", this.valueHtml);
  }

  setValue(value: string) {
    this.editorRef.setHtml(value);
  }

  @PassOnTo(onBeforeUnmount)
  onBeforeUnmountRun() {
    const editor = this.editorRef;
    if (editor == null) return;
    editor.destroy();
  }
}
</script>

<script setup lang="ts">
export interface Props {
  value: string;
  height?: string;
}
export interface Emits {
  (e: "update:value", value: string): void;
}
withDefaults(defineProps<Props>(), {
  height: "500px",
});
defineEmits<Emits>();

const we = new WangEditor();
defineExpose({
  setValue: we.setValue,
});
</script>

<template>
  <div style="border: 1px solid #ccc; z-index: 999999999">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="we.editorRef"
      :defaultConfig="we.toolbarConfig"
      mode="default"
    />
    <Editor
      :style="`height: ${height}; overflow-y: hidden;`"
      v-model="we.valueHtml"
      :defaultHtml="we.value"
      :defaultConfig="we.editorConfig"
      mode="default"
      @onCreated="we.handleCreated"
    />
  </div>
</template>
