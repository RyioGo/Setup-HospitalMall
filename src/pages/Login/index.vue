<script lang="ts">
// for node_modules api
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import { message } from "ant-design-vue";
// 导入背景模块
// import * as klouds from "klouds";
// for you api
import { admin_login } from "@/api/admin";
import { userModule } from "@/store/modules/user";

import { login_type } from "@/types/admin";

import storage from "@/libs/StorageClient";
// for you components

@Setup
class LoginView extends Context {
  router = useRouter();
  // 登录背景实例
  clouds: any = null;
  // 用户账户
  form: login_type = {
    account: "cooper",
    password: "123456",
  };
  // 加载
  loading = false;

  setBtnRef!: any;

  // 登录验证
  async onFinish() {
    const load = message.loading("验证登录...");
    this.loading = true;
    const res = await admin_login(this.form);

    if (res && res.code == 200) {
      load.then(() => {
        message.success("验证通过，开始登录！");
        // 设置store商店
        userModule.SETUSERINFO({
          token: res.data.token,
          name: res.data.name,
          account: res.data.account,
          headPicture: res.data.headPicture,
        });
        // 设置本地存储
        storage.set("token", res.data.token);
        storage.set("name", res.data.name);
        storage.set("account", res.data.account);
        storage.set("headPicture", res.data.headPicture);
        this.loading = false;
        // 完成登录
        this.router.replace("/base/index");
      });
    } else {
      load.then(() => {
        message.error(res.message);
        this.loading = false;
      });
    }
  }

  onFinishFailed() {
    message.error("验证未通过！");
  }

  @PassOnTo(onMounted)
  onMountedRun() {
    //初始化背景挂载;
    // this.clouds = klouds.create({
    //   selector: "#cloud_canvas",
    //   speed: 1,
    //   layerCount: 7,
    // });
  }
}

export default defineComponent({
  ...LoginView.inject(),
});
</script>

<template>
  <div class="login-body">
    <!-- <canvas id="cloud_canvas" /> -->
    <div class="login-main" v-load="loading">
      <div class="login-title">
        <span>欢迎访问老中医管理平台</span>
      </div>
      <a-form
        class="login-fields"
        size="small"
        :model="form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="account" class="login-fields-item">
          <img class="icon" src="./img/user.png" />
          <input placeholder="用户名" type="text" v-model="form.account" />
        </a-form-item>
        <a-form-item name="password" class="login-fields-item">
          <img class="icon" src="./img/password.png" />
          <a-input
            @keyup.enter="setBtnRef.click()"
            type="password"
            v-model:value="form.password"
            placeholder="密码"
          />
        </a-form-item>
        <a-form-item class="login-btn">
          <a-button
            class="btn"
            :ref="(el:any) => (setBtnRef = el)"
            block
            html-type="submit"
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-body {
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  #cloud_canvas {
    position: absolute;
    z-index: 0;
    width: 100vw;
    height: 100vh;
  }
  .login-main {
    box-sizing: content-box;
    width: 240px;
    border-top: 3px solid #dba871;
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    padding: 100px 40px 40px 40px;
    background: #35394abc;
    background: linear-gradient(45deg, #35394abc 0%, #1f222eee 100%);
    .login-title {
      color: #afb1be;
      height: 60px;
      text-align: left;
      font-size: 16px;
    }
    .login-fields {
      position: absolute;
      left: 0;
      width: 100%;
      .login-fields-item {
        position: relative;
        display: flex;
        align-items: center;
        background-color: #35394a72;
        border-bottom: 1px solid rgb(67, 67, 67);
        margin-bottom: 0;
        .icon {
          position: absolute;
          top: 50%;
          left: 32px;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
        }
        input {
          width: calc(100% - 130px);
          box-sizing: content-box;
          color: #afb1be;
          font-size: 14px;
          background-color: transparent;
          height: 20px;
          padding: 10px 65px;
          border: none;
          outline: none;
          box-shadow: none;
          &[type="password"] {
            color: #dba871;
          }
        }
      }
      .login-btn {
        margin-top: 25px;
        padding: 0 24px;
        .btn {
          width: 100%;
          color: #fff;
          border-color: #dba871;
          background: #dba871;
        }
      }
    }
  }
}
</style>
