<template>
  <div class="event">
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
        }}名まで参加可能</v-card-text
      >
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

<style scoped>
table {
  border: 1px #ddd solid;
  border-radius: 3px;
}
th {
  background-color: #5cc;
}
</style>

<script>
//import { mapGetters } from "vuex";
export default {
  mounted() {
    console.log("event_detail create");
    this.event = this.$store.getters.getEventById(this.$route.params.id);
    this.event = this.event.event;
  },
  data() {
    return {
      events: "",
      event: ""
    };
  }
};
</script>
