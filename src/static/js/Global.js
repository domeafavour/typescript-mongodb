const Global = new Vue({
  data: () => ({
    user: {},
  }),
});

export default {
  install(vue) {
    if (!vue.prototype.$global) {
      vue.prototype.$global = Global;
    }
  },
};
