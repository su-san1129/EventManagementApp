<template>
  <v-app>
    <v-app-bar color="teal lighten-3" dark app>
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title :to="{ name: 'home' }"
        >イベント管理アプリ</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="{ name: 'home' }">Home</v-btn>
        <v-btn text :to="{ name: 'about' }">About</v-btn>
        <v-btn text :to="{ name: 'anxiousList' }">気になるリスト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <SideNav />
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
import firebase from "firebase";
import SideNav from "@/components/SideNav";
export default {
  name: "App",
  created() {
    this.eventsSetAction();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },
  components: {
    SideNav
  },

  data: () => ({}),
  methods: {
    ...mapActions([
      "toggleSideMenu",
      "eventsSetAction",
      "setLoginUser",
      "logout",
      "deleteLoginUser"
    ])
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
h2 {
  position: relative;
  padding: 0.25em 0;
}
h2:after {
  content: "";
  display: block;
  height: 4px;
  background: -webkit-linear-gradient(to right, #a6d3c8, transparent);
  background: linear-gradient(to right, #a6d3c8, transparent);
}
</style>
