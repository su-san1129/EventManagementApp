<template>
  <div class="event">
    <h1>イベント詳細</h1>
    <!-- <img :src="event.banner" /> -->
    <v-card>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ event.title }}</v-card-title>
      </v-img>
      <v-card-text
        >現在の参加者：{{ event.participants }}名 | あと{{
          event.ticket_limit
        }}名まで参加可能
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <h2>開催場所</h2>
        <span>{{ event.address }}</span>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <span v-html="event.description"></span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import axios from "axios";
export default {
  mounted() {
    console.log("event_detail create");
    if (!this.$store.state.events.length) {
      axios
        .get("https://api.doorkeeper.jp/events?prefecture=tokyo")
        .then(response => {
            this.event = response.data.find(eve => eve.event.id === parseInt(this.$route.params.id)
          )
          this.event = this.event.event;
          // 通信成功時にコミットする.
          console.log("RE:event detail ")
        });
    } else {
      this.event = this.$store.getters.getEventById(this.$route.params.id)
      this.event = this.event.event
    }
  },
  data() {
    return {
      event: []
    };
  }
};
</script>
