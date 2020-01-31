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
      v-if="$store.state.login_user"
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
        <v-list-item>
          <v-btn
            text
            :to="{ name: 'event_detail', params: { id: item.event.id } }"
          >
            {{ item.event.title | longTitleCut }}
          </v-btn>
        </v-list-item>
      </template>
      <template v-slot:item.event.address="{ item }">
        {{ item.event.address | longAddressCut }}
      </template>
      <template v-slot:item.event.participants="{ item }">
        {{ item.event.participants }}名
      </template>
    </v-data-table>

    <v-data-table
      :headers="headers"
      :items="$store.state.events"
      :items-per-page="10"
      item-key="event.id"
      class="elevation-1"
      v-if="!$store.state.login_user"
    >
      <template v-slot:item.event.starts_at="{ item }">
        {{ item.event.starts_at | sliceStartsAt }}
      </template>
      <template v-slot:item.event.title="{ item }">
        <v-list-item>
          <v-btn
            text
            :to="{ name: 'event_detail', params: { id: item.event.id } }"
          >
            {{ item.event.title | longTitleCut }}
          </v-btn>
        </v-list-item>
      </template>
      <template v-slot:item.event.address="{ item }">
        {{ item.event.address | longAddressCut }}
      </template>
      <template v-slot:item.event.participants="{ item }">
        {{ item.event.participants }}名
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  data: () => ({
    headers: [
      { text: "開催日", value: "event.starts_at" },
      { text: "イベント名", value: "event.title" },
      { text: "住所", value: "event.address" },
      { text: "参加人数", value: "event.participants" }
    ],
    selected: [],
    toAnxious: []
  }),
  methods: {
    onList() {
      if (!this.selected.length) {
        alert("チェックを入れてください");
        return;
      } // selectedが空なら保存しない
      this.isCheckEvent();
      this.setList(this.toAnxious); // アクションの呼び出し
      this.selected = []; // 選択中の配列を空にする
      this.toAnxious = [];
    },
    getNotify(title, text, type) {
      this.$notify({
        group: "foo",
        title: "ID:" + title,
        text: text,
        type: type
      });
    },
    isCheckEvent() {
      this.selected.forEach(selectEvent => {
        let a = this.anxiousList.find(e => e.event.id === selectEvent.event.id);
        if (a != null) {
          this.getNotify(
            "すでにお気に入りに登録されています。",
            selectEvent.event.id,
            "error"
          );
        } else {
          this.getNotify(
            "気になるリストへ追加しました！",
            selectEvent.event.id,
            "primary"
          );
          this.toAnxious.push(selectEvent);
        }
      });
    },
    ...mapActions(["setList"])
  },
  computed: {
    ...mapState(["anxiousList"])
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
