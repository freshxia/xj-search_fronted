<script setup lang="ts">
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import Post from "@/model/Post";
import { withDefaults, defineProps } from "vue";
const listData = ref([]);
interface Props {
  postList: Post[];
}
const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});

// listData.push({
//   href: "https://www.antdv.com/",
//   title: `ant design vue part ${i}`,
//   avatar: "https://api.btstu.cn/sjtx/api.php?lx=c1&format=images",
//   description:
//     "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//   content:
//     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// });

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: "156" },
  { icon: LikeOutlined, text: "156" },
  { icon: MessageOutlined, text: "2" },
];
</script>

<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="props.postList"
  >
    <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
          />
        </template>
        <a-list-item-meta :description="item.title">
          <!--          <template #title>-->
          <!--            <a :href="item.href">{{ item.title }}</a>-->
          <!--          </template>-->
          <!--          <template #avatar><a-avatar :src="item.avatar" /></template>-->
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
