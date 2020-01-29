<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="photoURL" :src="photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="$store.state.login_user"
        @click="logout"
      >
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.items = this.getItems
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters(["userName", "photoURL", "getItems"])
  },
  watch: {
    // userNameを監視。
    userName: function() {
      if (this.userName === "") {
        //console.log("null");
        this.items = this.getItems
      } else {
        //console.log("item splice");
        this.items = this.items.filter(item => item.id !== 3);
      }
    }
  },
  methods: {
    ...mapActions(["logout"])
    }
};
</script>
