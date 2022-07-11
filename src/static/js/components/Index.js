import { indexRoutes } from '../routes.js';
import { fetchCurrent } from '../services/user.js';
import SideNav from './SideNav.js';
import Topbar from './Topbar.js';

export default {
  data: () => ({ routes: indexRoutes, drawer: null }),
  components: {
    SideNav,
    Topbar,
  },
  computed: {
    items() {
      return this.routes.filter((route) => route.menu);
    },
  },
  template: `
    <v-app>
      <v-app-bar app dark color="blue">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-app-bar>
      <side-nav :routes="routes" />

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  `,
  async mounted() {
    const user = await fetchCurrent();
    if (user) {
      this.$global.user = user;
    } else {
      this.$router.replace('/login');
    }
  },
};
