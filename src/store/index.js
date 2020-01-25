import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    event: {}
  },
  mutations: {
    eventsSetMutation(state, data) {
      state.events = data;
    },
    mutateEventSet(state, payload) {
      state.events = payload;
    },
    set(state, { event }) {
      state.event = event;
    }
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
    load({ commit }, id) {
      let detail = this.state.events.find(event => {
        event.event.id === id;
      });
      console.log("detail:" + detail);
      commit("set", { detail });
    }
  },
  getters: {
    getEventById: state => id => {
      console.log("getEventById");
      var aaa = state.events.find(event => {
        console.log(event.event.id)
        console.log(id)
        event.event.id === id
      })
      console.log(aaa)
    }
  },
  modules: {}
});
