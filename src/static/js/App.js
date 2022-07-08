import SideNav from './components/SideNav.js';
import Topbar from './components/Topbar.js';
import { routes } from './routes.js';

const router = new VueRouter({
  routes,
});

export default new Vue({
  el: document.getElementById('app'),
  data() {
    return { routes };
  },
  template: `
    <router-view />
  `,
  router,
  components: {
    SideNav,
    Topbar,
  },
});
