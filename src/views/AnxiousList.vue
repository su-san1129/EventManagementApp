<template>
  <div>
    <h1>気になるイベントリスト</h1>
    <v-data-table
      :headers="headers"
      :items="events"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.event.starts_at="{ item }">
        {{ item.event.starts_at | sliceStartsAt }}
      </template>
      <template v-slot:item.event.title="{ item }">
        <router-link
          :to="{ name: 'event_detail', params: { id: item.event.id } }"
        >
          {{ item.event.title | longTitleCut }}
        </router-link>
      </template>
      <template v-slot:item.event.address="{ item }">
        {{ item.event.address | longAddressCut }}
      </template>
      <template v-slot:item.event.participants="{ item }">
        {{ item.event.participants }}名
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  created() {
    this.events = this.$store.state.anxiousList;
  },
  data() {
    return {
      headers: [
        { text: "開催日", value: "event.starts_at" },
        { text: "イベント名", value: "event.title" },
        { text: "住所", value: "event.address" },
        { text: "参加人数", value: "event.participants" },
        { text: "操作", value: "action", sortable: false }
      ],
      events: null
    };
  },
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
  },
  methods: {
     deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteAnxiousEvent(id)
      }
    },
    ...mapActions(['deleteAnxiousEvent'])
  }
};
</script>
