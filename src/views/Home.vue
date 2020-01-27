<template>
  <div>
    <h1>イベント一覧</h1>
    <v-data-table
      v-model="selected"
      show-select
      :headers="headers"
      :items="$store.state.events"
      :items-per-page="10"
      item-key="event.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-btn outlined class="my-3 ml-3" @click="onList"
          >気になるリストへ追加</v-btn
        >
      </template>
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
    </v-data-table>
    <notifications group="foo" position="bottom right"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "home",
  data: () => ({
    headers: [
      { text: "開催日", value: "event.starts_at" },
      { text: "イベント名", value: "event.title" },
      { text: "住所", value: "event.address" },
      { text: "参加人数", value: "event.participants" }
    ],
    selected: []
  }),
  methods: {
    onList() {
      if (!this.selected.length) return; // selectedが空なら保存しない
      console.log("気になるリストへ追加");
      this.setList(this.selected); // アクションの呼び出し
      console.log(this.selected.length)
      for (let i = 0; i < this.selected.length; i++) {
        this.$notify({
          group: "foo",
          title: "ID:" + this.selected[i].event.id ,
          text: "気になるリストへ追加しました！"
        });
      }
      this.selected = []; // 選択中の配列を空にする
    },
    ...mapActions(["setList"])
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
  }
};
</script>
