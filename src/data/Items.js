const items = [
  { id: 1, title: "Home", icon: "mdi-home", link: { name: "home" } },
  { id: 2, title: "About", icon: "mdi-menu", link: { name: "about" } },
  { id: 3, title: "Login", icon: "mdi-login", link: { name: "login" } },
];

export default {
  getItems() {
    return items
  }
};
