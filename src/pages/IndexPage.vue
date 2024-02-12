<template>
  <div class="main">
    <a-input-search
      class="search_text"
      v-model:value="searchText"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <a-tabs
      class="tab"
      v-model:activeKey="activeKey"
      centered
      size="large"
      @change="onTabChange"
    >
      <a-tab-pane key="post" tab="文章">
        <PostItem :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureItem />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserItem :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "@/axios/myAxios";
import PostItem from "@/views/PostItem.vue";
import PictureItem from "@/views/PictureItem.vue";
import UserItem from "@/views/UserItem.vue";
const router = useRouter();
// 搜索框 输入的值
const searchText = ref("");
// tab栏 的key
const activeKey = ref("post");
const postList = ref({});
const userList = ref();

// 点击搜索时触发
const onSearch = (searchText: string) => {
  myAxios.post("/post/list/page/vo", {}).then((res) => {
    if (res) {
      postList.value = res.data?.records;
    }
    console.log(postList.value);
  });

  myAxios.post("/user/list/page/vo", {}).then((res) => {
    if (res) {
      userList.value = res.data?.records;
    }
    console.log(userList.value);
  });
};
// tab栏切换时触发
const onTabChange = (type: string) => {
  console.log(type);
};
</script>
<style scoped>
.search_text {
  max-width: 1024px;
}
.main {
  margin: 0 auto;
  max-width: 1024px;
}
.tab {
  max-width: 1024px;
  margin-top: 20px;
}
</style>
