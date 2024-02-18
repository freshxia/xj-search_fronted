<script setup lang="ts">
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import Picture from "@/model/Picture";
import MyDivider from "@/pages/MyDivider.vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

interface Props {
  pictureList: Picture[];
}
const props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});

// const list = ref({});
// list.value = props.pictureList.map((item) => {
//   return { src: item.src };
// });
// const acrossOrigin = defineProps({
//   crossOrigin: {
//     type: Boolean,
//     default: false,
//   },
// });
</script>
<!--:src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"-->
<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :data-source="props.pictureList">
    <template #renderItem="{ item }">
      <img :src="item.src" alt="" />
      <MyDivider />
    </template>
  </a-list>
  <!--  <Waterfall :list="props.pictureList">-->
  <!--    <template #item="{ item }">-->
  <!--      <div class="card">-->
  <!--        <LazyImg :url="item.src" cross-origin="false" />-->
  <!--        <p class="text">这是具体内容</p>-->
  <!--      </div>-->
  <!--    </template>-->
  <!--  </Waterfall>-->
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
