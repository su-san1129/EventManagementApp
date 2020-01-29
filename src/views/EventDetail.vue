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
        >現在の参加者：{{ event.participants }}名
        <span v-if="event.ticket_limit > 0"> | あと{{ event.ticket_limit }}名まで参加可能</span>
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
export default {
  mounted() {
    console.log("event_detail create");
    if (!this.$store.state.events.length) {
      //ストアにイベントが登録されていない場合
      this.$store.watch(
        state => state.events,
        newValue => {
          this.event = newValue.find(
            eve => eve.event.id === parseInt(this.$route.params.id)
          );
          this.event = this.event.event;
        }
      );
    } else {
      this.event = this.$store.getters.getEventById(this.$route.params.id)
      this.event = this.event.event;
    }
  },
  data() {
    return {
      event: []
    };
  }
};
</script>
