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
      <v-card-text>
        <span v-html="event.description"></span>
      </v-card-text>
    </v-card>
  </div>
</template>
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
