import { indexRoutes } from '../routes.js';
import { hasCurrentUser } from '../utils/user.js';
import SideNav from './SideNav.js';
import Topbar from './Topbar.js';

export default {
  data: () => ({ routes: indexRoutes }),
  components: {
    SideNav,
    Topbar,
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
  methods: {
    checkUser() {
      if (!hasCurrentUser()) {
        this.$router.replace('/login');
      }
    },
  },
  mounted() {
    this.checkUser();
  },
  updated() {
    this.checkUser();
  },
};
