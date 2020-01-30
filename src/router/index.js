import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import EventDetail from "@/views/EventDetail.vue";
import AnxiousList from "@/views/AnxiousList.vue";
import firebase from "firebase";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "/event/:id",
    name: "event_detail",
    component: EventDetail
  },
  {
    path: "/anxious_list",
    name: "anxiousList",
    component: AnxiousList
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    if (!document.referrer) {
      store.commit("start");
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //ログインされている場合は、ホーム画面を表示
        store.commit("end");
        next({
          path: "/"
        });
      } else {
        //ログインしていなければそのまま、表示
        store.commit("end")
        next();
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
