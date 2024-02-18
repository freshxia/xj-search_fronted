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
        <PictureItem :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserItem :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/axios/myAxios";
import PostItem from "@/views/PostItem.vue";
import PictureItem from "@/views/PictureItem.vue";
import UserItem from "@/views/UserItem.vue";
import { message } from "ant-design-vue";
const router = useRouter();
const route = useRoute();
// tab栏 的key
const activeKey = ref(route.params.category);
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);
const searchText = ref(route.query.text || "");

// 初始化搜索参数
const initSearchParams = {
  text: "",
  category: activeKey,
};

const loadData = (params: any) => {
  const { category = "post" } = params;
  if (!category) {
    message.warning("请求的类别不能为空");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
    category: category,
  };
  myAxios.post("/search/vo", query).then((res) => {
    if (res) {
      if (category === "post") {
        postList.value = res.data.postList;
      } else if (category === "user") {
        userList.value = res.data.userList;
      } else if (category === "picture") {
        pictureList.value = res.data.pictureList;
      }
    }
  });
};
const searchParams = ref(initSearchParams);
//当路由发生变化时触发搜索
watchEffect(() => {
  // 直接根据路由跳转到对应的tab
  if (router.currentRoute.value.path === "/post") {
    activeKey.value = "post";
  } else if (router.currentRoute.value.path === "/user") {
    activeKey.value = "user";
  } else if (router.currentRoute.value.path === "/picture") {
    activeKey.value = "picture";
  }
  //当路由参数发生变化时触发搜索
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    category: route.params.category,
  } as any;
  loadData(searchParams.value);
});

const loadDataOld = () => {
  myAxios
    .post("/search/vo", { category: "post", searchText: searchText })
    .then((res) => {
      if (res) {
        postList.value = res.data.postList;
      }
      console.log(postList.value);
    });
  myAxios
    .post("/search/vo", { category: "user", searchText: searchText })
    .then((res) => {
      if (res) {
        userList.value = res.data.userList;
      }
      console.log(userList.value);
    });
  myAxios
    .post("/search/vo", { category: "picture", searchText: searchText })
    .then((res) => {
      if (res) {
        pictureList.value = res.data.pictureList;
      }
      console.log(pictureList.value);
    });
};
// 点击搜索时触发
const onSearch = (value: string) => {
  router.push({
    query: {
      // ...searchParams.value,
      text: value,
    },
  });
};

// tab栏切换时触发
const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: {
      text: route.query.text,
    },
  });
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
