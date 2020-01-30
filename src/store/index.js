import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

Vue.use(Vuex);

const apiUrl = "https://api.doorkeeper.jp/events?prefecture=tokyo";
const items = [
  { id: 1, title: "Home", icon: "mdi-home", link: { name: "home" } },
  { id: 2, title: "About", icon: "mdi-menu", link: { name: "about" } },
  { id: 3, title: "Login", icon: "mdi-login", link: { name: "login" } }
];

export default new Vuex.Store({
  state: {
    loading: false,
    items: items,
    login_user: null,
    events: [], // APIから取得したイベント一覧
    anxiousList: [], //お気に入りリスト
    drawer: false // サイドバー
  },
  mutations: {
    start(state) {
      state.loading = true;
    },
    end(state) {
      state.loading = false;
    },
    eventsSetMutation(state, data) {
      state.events = data;
    },
    setListMutation(state, payload) {
      payload.forEach(event =>
        state.anxiousList.find(e => e.event.id === event.event.id)
          ? console.log()
          : firebase
              .firestore()
              .collection(`users/${this.getters.uid}/anxious_event`)
              .add(event)
              .then(doc => {
                event.id = doc.id;
                state.anxiousList.push(event);
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
    deleteAnxiousEventMutation(state, anxiousEventId) {
      const index = state.anxiousList.findIndex(
        e => e.event === anxiousEventId
      );
      state.anxiousList.splice(index, 1);
    },
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {
    eventsSetAction({ commit }) {
      // APIを取得
      axios.get(apiUrl).then(response => {
        // 通信成功時にコミットする.
        commit("eventsSetMutation", response.data);
      });
    },
    setAnxiousList({ commit }) {
      firebase
        .firestore()
        .collection(`users/${this.getters.uid}/anxious_event`)
        .get()
        .then(snapshot =>
          snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            commit("setAnxiousListMutation", data);
          })
        );
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    setList({ commit }, data) {
      commit("setListMutation", data);
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
      console.log("yahooo")
    },
    logout() {
      firebase.auth().signOut();
    },
    setItemAction({ commit }, items) {
      commit("setItemMutation", items);
    },
    deleteAnxiousEvent({ commit, getters }, anxiousEventId) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/anxious_event`)
          .doc(anxiousEventId)
          .delete()
          .then(() => {
            commit("deleteAnxiousEventMutation", anxiousEventId);
          });
      }
    }
  },
  getters: {
    // イベントobjの一件検索
    uid: state => (state.login_user ? state.login_user.uid : null),
    userName: state => (state.login_user ? state.login_user.displayName : ""),
    photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
    getAnxiousList: state => state.anxiousList,
    getItems: state => state.items
  },
  modules: {}
});
