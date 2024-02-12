import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "@/pages/IndexPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/PostItem.vue"),
  },
  {
    path: "/picture",
    name: "picture",
    component: () => import("@/views/PictureItem.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserItem.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
