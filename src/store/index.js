import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";                                          

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
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
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
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
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    setList({ commit }, data) {
      commit("setListMutation", data);
    },
    setEventDetal({ commit }, id) {
      console.log('setEvent Detail!')
      commit("setEventDetailMutation", id)
    },
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut()
    }
  },
  getters: {
    // イベントobjの一件検索
    getEventById: state => id =>
      state.events.find(event => event.event.id === id),
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : ''
  },
  modules: {}
});
