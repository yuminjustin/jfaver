<template>
  <div>
    <h2>你好-我是肖鹤云</h2>
    <p>信息:{{ info }}</p>
    <p>{{ time }}</p>
    <button @click="hander1Click">新增</button>
    <button @click="hander2Click">删除</button>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref, defineExpose } from "vue";
defineProps({
  info: {
    type: String,
    default: "----",
  },
  time: {
    type: String,
    default: "0分钟",
  },
});

//  使用defineEmits创建名称，接受一个数组
let $myemit = defineEmits(["myAdd", "myDel"]);
let hander1Click = (): void => {
  $myemit("myAdd", "新增的数据");
};

let hander2Click = (): void => {
  $myemit("myDel", "删除的数据");
};

let sex = ref("男");
let info = reactive({
  like: "喜欢李诗晴",
  age: 27,
});
// 将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
  sex,
  info,
});
</script>
