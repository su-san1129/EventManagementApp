import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    anxiousList: [],
    drawer: false,
    links: [
      { text: "Home", to: "/" },
      { text: "About", href: "#about" }
    ]
  },
  mutations: {
    eventsSetMutation(state, data) {
      state.events = data;
    },
    mutateEventSet(state, payload) {
      state.events = payload;
    },
    setListMutation(state, payload) {
      state.anxiousList = payload
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
      commit("setListMutation", data)
    }

  },
  getters: {
    getEventById: state => id =>
      state.events.find(event => event.event.id === id),
    links: state => {
      return state.items;
    }
  },
  modules: {}
});
