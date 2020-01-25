<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.events"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:item.event.starts_at="{ item }">
      {{ item.event.starts_at | sliceStartsAt }}
    </template>
    <template v-slot:item.event.title="{ item }">
     <router-link :to="{ name: 'event_detail', params: { id: item.event.id }}">
        {{ item.event.title | longTitleCut }}
      </router-link>
    </template>
    <template v-slot:item.event.address="{ item }">
      {{ item.event.address | longAddressCut }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    headers: [
      { text: "開催日", value: "event.starts_at" },
      { text: "イベント名", value: "event.title" },
      { text: "住所", value: "event.address" }
    ]
  }),
  filters: {
    sliceStartsAt(str) {
      return str.slice(0, 10);
    },
    longTitleCut(str) {
      if (str.length > 50) {
        return str.slice(0, 40) + "...";
      }
      return str;
    },
    longAddressCut(str) {
      if (str.length > 20) {
        return str.slice(0, 20) + "...";
      }
      return str;
    }
  }
};
</script>
