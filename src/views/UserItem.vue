<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import User from "@/model/User";
interface Props {
  userList: User[];
}
const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>
<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :data-source="props.userList">
    <template #renderItem="{ item }">
      <img :src="item.userAvatar" alt="example" />
      <a-list-item>
        <a-card :title="item.userName">{{ item.userProfile }}</a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
img {
  width: 200px;
}
</style>
