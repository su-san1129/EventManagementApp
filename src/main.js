import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(Notifications)

var firebaseConfig = {
  apiKey: "AIzaSyA2SVuH0mR5nIVux3Kqp-4m81gQvizelqg",
  authDomain: "myfirstproject-80624.firebaseapp.com",
  databaseURL: "https://myfirstproject-80624.firebaseio.com",
  projectId: "myfirstproject-80624",
  storageBucket: "myfirstproject-80624.appspot.com",
  messagingSenderId: "592861209691",
  appId: "1:592861209691:web:cbb730cfad0a6817aa8b7e",
  measurementId: "G-GLCFRXZ0QQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
