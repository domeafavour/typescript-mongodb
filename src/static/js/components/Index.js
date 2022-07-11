import { indexRoutes } from '../routes.js';
import { fetchCurrent } from '../services/user.js';
import SideNav from './SideNav.js';
import Topbar from './Topbar.js';

export default {
  data: () => ({ routes: indexRoutes }),
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
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>

        <v-btn icon @click="logout">
          <v-icon>mdi-power</v-icon>
        </v-btn>
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
    const { success, data: user } = await fetchCurrent();
    if (success) {
      this.$global.user = user;
    } else {
      this.$router.replace('/login');
    }
  },
  methods: {
    toggleDrawer() {
      this.$global.drawer = !this.$global.drawer;
    },
    logout() {
      this.$router.replace('/login');
    },
  },
};
