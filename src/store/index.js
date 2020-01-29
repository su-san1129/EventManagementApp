import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
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
      console.log("pay" + payload);
      payload.forEach(event =>
        state.anxiousList.find(e => e.event.id === event.event.id)
          ? console.log("すでにお気に入りリストにあるため保存されません")
          : firebase
              .firestore()
              .collection(`users/${this.getters.uid}/anxious_event`)
              .add(event)
            .then(doc => {
              event.id = doc.id
              console.log(event)
              state.anxiousList.push(event)
            })
      );
    },
    setAnxiousListMutation(state, payload) {
      state.anxiousList.push(payload);
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setEventDetalMutation(state, getters, id) {
      state.event = getters.getEventById(id);
    },
    setItemMutation(state, items) {
      state.items = items;
    },
    deleteAnxiousEventMutation(state, anxiousEventId) {
      const index = state.anxiousList.findIndex(e => e.event === anxiousEventId)
      state.anxiousList.splice(index, 1)
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
    setAnxiousList({ commit }) {
      console.log("uid:"+this.getters.uid)
      firebase
        .firestore()
        .collection(`users/${this.getters.uid}/anxious_event`)
        .get()
        .then(snapshot =>
          snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            commit("setAnxiousListMutation", data)
          })
        );
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    setList({ commit }, data) {
      commit("setListMutation", data);
    },
    setEventDetal({ commit }, id) {
      console.log("setEvent Detail!");
      commit("setEventDetailMutation", id);
    },
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      firebase.auth().signOut();
    },
    setItemAction({ commit }, items) {
      console.log(items);
      commit("setItemMutation", items);
    },
    deleteAnxiousEvent({ commit, getters }, anxiousEventId) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/anxious_event`).doc(anxiousEventId).delete().then(() => {
          commit('deleteAnxiousEventMutation', anxiousEventId)
        })
      }
    }
  },
  getters: {
    // イベントobjの一件検索
    getEventById: state => id =>
      state.events.find(event => event.event.id === id),
    uid: state => (state.login_user ? state.login_user.uid : null),
    userName: state => (state.login_user ? state.login_user.displayName : ""),
    photoURL: state => (state.login_user ? state.login_user.photoURL : "")
  },
  modules: {}
});
