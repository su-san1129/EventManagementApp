<template>
  <v-app>
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title><router-link :to="{name: 'home'}">イベント管理アプリ</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="collapseOnScroll"
        color="white"
        hide-details
      ></v-checkbox>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto mt-4"
      max-height="750"
    >
      <v-container style="height: 1000px;">
        <v-content class="mt-12">
          <router-view />
        </v-content>
      </v-container>
    </v-sheet>
    <router-link :to="{name: 'about'}">リンクだよー</router-link>
  </v-app>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "App",

  created() {
    this.eventsSetAction();
  },
  components: {},

  data: () => ({
    collapseOnScroll: true
  }),
  methods: {
    ...mapActions(["eventsSetAction"])
  }
};
</script>
