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
    <div class="layout">
      <div class="left">
        <side-nav :routes="routes" />
      </div>
      <div class="right">
        <topbar />
        <router-view />
      </div>
    </div>
  `,
  router,
  components: {
    SideNav,
    Topbar,
  },
});
