import SideNav from './components/SideNav.js';
import Topbar from './components/Topbar.js';
import { routes } from './routes.js';
import Global from './Global.js';

const router = new VueRouter({
  routes,
});

const vuetify = new Vuetify();

Vue.use(Global);

export default new Vue({
  el: document.getElementById('app'),
  data() {
    return { routes };
  },
  template: `
    <router-view />
  `,
  router,
  vuetify,
  components: {
    SideNav,
    Topbar,
  },
});
