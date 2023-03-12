<script lang="ts" setup>
//  for node_modules api
import { reactive, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { UploadFile } from "ant-design-vue";

//  for you api
import { userModule } from "@/store/modules/user";
//  for you components

interface Props {
  limit?: number;
  accept?: string;
  value: Array<string> | string;
}

interface Emits {
  (e: "update:value", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  accept: "image/*",
});

const emits = defineEmits<Emits>();

const state: any = reactive({
  fileList: [],
  action: import.meta.env.RGAPI + "/system/file/storage",
  headers: {
    token: userModule.token,
  },
  visible: false,
  title: "",
  imageUrl: "",
});

const handlePreview = (file: UploadFile) => {
  state.visible = true;
  state.title = file.name;
  state.imageUrl = file.thumbUrl as string;
};
const handleCancel = () => {
  state.visible = false;
  state.title = "";
  state.imageUrl = "";
};

const change = ({ file, fileList }: { file: any; fileList: any }) => {
  if (file.response && file.response.code != 200) {
    file.status = "error";
  }
};

const setFile = (urls: Array<string> | string, num: number) => {
  if (num == 0) {
    state.fileList = [];
  }
  if (num == 1) {
    state.fileList[0] = {
      name: 0,
      percent: 100,
      status: "done",
      thumbUrl: urls,
      uid: 0,
      url: urls,
    };
  }
  if (num > 1) {
    (urls as Array<string>).forEach((item: string, index: number) => {
      state.fileList[index] = {
        name: index,
        percent: 100,
        status: "done",
        thumbUrl: item,
        uid: index,
        url: item,
      };
    });
  }
};

watch(
  () => state.fileList,
  () => {
    let urls: any = [];
    state.fileList.forEach((item: any) => {
      if (item.response && item.response.code == 200) {
        urls.push(item.response.data);
      }
    });
    emits("update:value", props.limit == 1 ? urls[0] || "" : urls);
  }
);

defineExpose({
  setFile,
});
</script>

<template>
  <div class="stateload">
    <a-upload
      list-type="picture-card"
      v-model:file-list="state.fileList"
      :action="state.action"
      :accept="accept"
      :headers="state.headers"
      :maxCount="limit"
      @preview="handlePreview"
      @change="change"
    >
      <plus-outlined v-if="state.fileList.length < limit" />
    </a-upload>
    <a-modal
      :zIndex="1002"
      :visible="state.visible"
      :title="state.title"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="state.imageUrl" />
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.stateload {
  position: relative;
  ::v-deep .ant-upload-list-item-info::before {
    left: 0;
  }
}
</style>
