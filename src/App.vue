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
        <v-btn text v-if="$store.state.login_user" @click="userLogout"
          >Logout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <SideNav />
    <v-container fluid fill-height align-start>
      <v-content>
        <LoadingOverlay />
        <router-view />
      </v-content>
    </v-container>
    <notifications group="foo" position="bottom right" />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import SideNav from "@/components/SideNav";
import LoadingOverlay from "@/components/LoadingOverlay";
export default {
  name: "App",
  created() {
    this.eventsSetAction();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
        this.setAnxiousList();
      } else {
        this.deleteLoginUser();
      }
    });
  },
  components: {
    LoadingOverlay,
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
    userLogout() {
      this.logout();
      this.$notify({
        group: "foo",
        title: "ログアウトしました",
        type: "warn",
      });
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
