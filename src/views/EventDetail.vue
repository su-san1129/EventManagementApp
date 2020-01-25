<template>
  <div class="event">
    {{ event }}
  </div>
</template>
<script>
export default {
  created(){
    this.event = this.$store.getters.getEventById(this.$route.params.id)
    console.log("event:")
    console.log(this.event)
  },
  data() {
    return {
      events: "",
      event: {}
    };
  }
};
</script>
