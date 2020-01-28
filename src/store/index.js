import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: [],
    events: [], // APIから取得したイベント一覧
    anxiousList: [], //お気に入りリスト
    drawer: false // サイドバー
  },
  mutations: {
    eventsSetMutation(state, data) {
      state.events = data;
    },
    setListMutation(state, payload) {
      payload.forEach(event =>
        state.anxiousList.find(e => e.event.id === event.event.id)
          ? console.log("すでにお気に入りリストにあるため保存されません")
          : state.anxiousList.push(event)
      );
    },
    setEventDetalMutation(state, getters, id) {
      state.event = getters.getEventById(id)
    },
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {
    eventsSetAction({ commit }) {
      // APIを取得
      axios
        .get("https://api.doorkeeper.jp/events?prefecture=tokyo")
        .then(response => {
          console.log("eventsSetAction");
          // 通信成功時にコミットする.
          commit("eventsSetMutation", response.data);
        });
    },
    setList({ commit }, data) {
      commit("setListMutation", data);
    },
    setEventDetal({ commit }, id) {
      console.log('setEvent Detail!')
      commit("setEventDetailMutation", id)
    }
  },
  getters: {
    // イベントobjの一件検索
    getEventById: state => id =>
      state.events.find(event => event.event.id === id)
  },
  modules: {}
});
