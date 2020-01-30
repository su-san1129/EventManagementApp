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
        <v-card-title>{{ event.event.title }}</v-card-title>
      </v-img>
      <v-card-text
        >現在の参加者：{{ event.event.participants }}名
        <span v-if="event.event.ticket_limit > 0">
          | あと{{ event.event.ticket_limit }}名まで参加可能</span>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <h2>開催場所</h2>
        <span>{{ event.event.address }}</span>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <span v-html="event.event.description"></span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  created() {
    this.events = this.storeEvents
    this.event = this.findEventById(this.events)
  },
  computed: {
    ...mapGetters(["getAnxiousList"]),
    ...mapState({storeEvents: "events"})
  },
  watch: {
    anxiousList: function() {
      this.event = this.anxiousList.find(
        eve => eve.event.id === parseInt(this.$route.params.id)
      );
    },
    storeEvents: function(){
      this.events = this.storeEvents
      this.event = this.findEventById(this.events);
    }
  },
  data() {
    return {
      event: [],
      events: [],
      anxiousList: []
    };
  },
  methods: {
    findEventById(e){
      return e.find(eve => eve.event.id === parseInt(this.$route.params.id))
    }
  }
};
</script>
