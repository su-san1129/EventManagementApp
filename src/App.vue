<template>
  <v-app>
    <v-app-bar color="teal lighten-3" dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title :to="{ name: 'home' }"
        >イベント管理アプリ</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="{ name: 'home' }">Home</v-btn>
        <v-btn text :to="{ name: 'about' }">About</v-btn>
        <v-btn text :to="{ name: 'anxiosList' }">気になるリスト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-container fluid fill-height align-start
      >>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
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

  data: () => ({}),
  methods: {
    ...mapActions(["eventsSetAction"])
  }
};
</script>
<style>
h1 {
  position: relative;
  padding: 0.5em;
  background: #a6d3c8;
  color: white;
}
</style>
