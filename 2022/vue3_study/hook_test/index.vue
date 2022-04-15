<template>
  <div>
    <h1>Hook Test</h1>
    <div class="home">
      显示的值{{ flag }}
      <button @click="changeHander">改变值</button>
    </div>
    <test-com
      :info="msg"
      time="42分钟"
      @myAdd="myAddHander"
      @myDel="myDelHander"
      ref="testcomRef"
    ></test-com>
    <button @click="getSonHander">获取子组件中的数据</button>
    <span> 有开始循环了-开端 </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
//在使用的使用直接是小写和横杠的方式连接 test-com
import TestCom from "./temp1.vue";
let flag = ref("开端-第一次循环");
let msg = "公交车-第一次循环";
let changeHander = (): void => {
  flag.value = "开端-第二次循环";
};

let myAddHander = (mess: string): void => {
  console.log("新增==>", mess);
};

let myDelHander = (mess: string): void => {
  console.log("删除==>", mess);
};

const testcomRef = ref();

const getSonHander = () => {
  console.log("获取子组件中的性别", testcomRef.value.sex);
  console.log("获取子组件中的其他信息", testcomRef.value.info);
};

const state = reactive({
  color: "blue",
});
</script>

<style scoped>
span {
  /* 使用v-bind绑定state中的变量 */
  color: v-bind("state.color");
}
</style>
