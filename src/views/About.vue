<template>
  <div class="about">
    <v-content>
      <Drawer />
    </v-content>
    <h1>This is an about page</h1>
    <router-link :to="{ name: 'home' }">ホームへのリンク</router-link>
  </div>
</template>

<script>
import Drawer from "@/components/HomeDrawer.vue";
export default {
  components: {
    Drawer
  }
};
</script>
