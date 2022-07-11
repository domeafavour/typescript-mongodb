const Global = new Vue({
  data: () => ({
    user: {
      posts: [],
    },
    drawer: true,
  }),
});

export default {
  install(vue) {
    if (!vue.prototype.$global) {
      vue.prototype.$global = Global;
    }
  },
};
