import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    anxiousList: [],
    drawer: false
  },
  mutations: {
    eventsSetMutation(state, data) {
      state.events = data;
    },
    mutateEventSet(state, payload) {
      state.events = payload;
    },
    setListMutation(state, payload) {
      payload.forEach(event =>
        state.anxiousList.find(e => e.event.id === event.event.id)
          ? console.log("すでにお気に入りリストにあるため保存されません")
          : state.anxiousList.push(event)
      );
    },
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {
    eventsSetAction({ commit }) {
      axios
        .get("https://api.doorkeeper.jp/events?prefecture=tokyo")
        .then(response => {
          console.log("eventsSetAction");
          // 通信成功時にコミットする.
          commit("eventsSetMutation", response.data);
        });
    },
    commitEventSet({ commit }, data) {
      commit("mutateEventSet", data);
    },
    setList({ commit }, data) {
      commit("setListMutation", data);
    }
  },
  getters: {
    getEventById: state => id =>
      state.events.find(event => event.event.id === id)
  },
  modules: {}
});
