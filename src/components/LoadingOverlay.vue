<template>
  <div class="aaa" v-if="loading">
    <transition name="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        v-if="loading"
      ></v-progress-circular>
    </transition>
    loading...
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>
<style>
v-progress-circular {
  display: block;
  margin: 0px auto;
}
.aaa {
  margin-left: 580px;
  margin-top: 200px
}
.loading-enter-active {
  transition: all 0.25s;
}
.loading-leave-active {
  transition: all 0.5s ease 0.5s; /* ルータービューが終わった後に */
}
</style>
