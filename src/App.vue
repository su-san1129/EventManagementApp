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
        <v-btn text v-if="$store.state.login_user" :to="{ name: 'anxiousList' }"
          >気になるリスト</v-btn
        >
        <v-btn text v-if="$store.state.login_user" @click="logout"
          >Logout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <SideNav />
    <v-container fluid fill-height align-start>
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
        this.setAnxiousList();
        if (this.$router.currentRoute.name === "login")
          this.$router.push({ name: "home" });
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" });
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
      "deleteLoginUser",
      "setAnxiousList"
    ]),
    userLogout(position, type) {
      this.$notify({
        title: "メッセージです。",
        text: "click to " + position,
        duration: 100,
        group: position,
        type: type
      });
      this.logout;
    }
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
