import type { Router, RouteRecordRaw } from "vue-router";
// 首先把你需要动态路由的组件地址全部获取
let modules = import.meta.glob("../pages/**/*.vue");

class UtilsClient {
  //  校验数据类型
  typeOf(data: any): string {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
  //  动态注册路由
  resigerRoute(routes: RouteRecordRaw[], router: Router) {
    routes.forEach((item: RouteRecordRaw, key: number) => {
      if (item.children && item.children.length) {
        this.resigerRoute(item.children, router);
      } else {
        router.addRoute("默认布局", {
          path: item.path,
          name: item.name,
          component: modules[`../pages/${item.component}.vue`],
          meta: item.meta,
        });
      }
    });
    return true;
  }
  //  根据数据对象将相同  key 字段的 value 进行深度赋值,适用于调取详情接口后的res.data赋值操作
  //  reactive响应时可以不需要接收返回值。
  objectCopyValue(
    orgin: { [x: string]: any },
    result: { [x: string]: any }
  ): any {
    Object.keys(orgin).forEach((item: string) => {
      if (this.typeOf(result[item]) == "object") {
        orgin[item] = this.objectCopyValue(orgin[item], result[item]);
      } else {
        orgin[item] = JSON.parse(JSON.stringify(result[item]));
      }
    });
    return orgin;
  }

  specData(params: any) {
    let params1 = params;
    /**
     * @将name值转换格式为 ['颜色','尺寸',]
     * */
    let keys: any[] = [];
    function keyConvertArr() {
      params1.forEach((item: { name: any }) => {
        keys.push(item.name);
      });
      valueConvertArr();
    }

    /**
     * @将spec值转换格式为['黑', '白',['s码', 'm码']]
     * */
    function valueConvertArr() {
      let arr1;
      //判断是否只有一组规格
      if (params1.length !== 1) {
        for (let j = params1.length - 1, i = j; i >= 0; i--) {
          if (!arr1) {
            params1[i - 1].spec.push(params1[i].spec);
            arr1 = params1[i - 1].spec;
            if (i <= 1) break;
            i = i - 2;
          }
          params1[i].spec.push(arr1);
          arr1 = params1[i].spec;
        }
      } else {
        arr1 = params1[0].spec;
      }

      //调用deepClone函数将处理好的数组传入
      deepClone(arr1);
    }

    let obj: any = {}; //结果对象
    let arr: any[] = []; //结果数组
    let num = 0; //判断是在第几层，用作keys的index
    function deepClone(data: any) {
      for (let i = 0; i < data.length; i++) {
        /**
         * 因为循环到数组的最后一项还是数组的话，已经通过递归传入，所以这里要做的是num--，并退出当前循环。
         * 两级结构此判断没有，三级结构后有用
         * 类似：['黑', '白', ['s码', 'm码',['不锈钢','塑料']]
         */
        if (data[i] instanceof Array) {
          num--;
          return;
        }
        obj[keys[num]] = data[i];
        if (data[data.length - 1] instanceof Array) {
          num++;
          deepClone(data[data.length - 1]);
        } else {
          let obj1 = JSON.parse(JSON.stringify(obj));
          arr.push(obj1);
        }
        if (i === data.length - 1) {
          num--;
        }
      }
    }

    keyConvertArr();

    return arr;
  }
}

export default new UtilsClient();
