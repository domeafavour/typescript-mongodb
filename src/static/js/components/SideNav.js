import { removeCurrentUser } from '../utils/user.js';

export default {
  name: 'side-nav',
  props: {
    routes: {
      type: Array,
      default: [],
    },
  },
  computed: {
    items() {
      return this.routes.filter((route) => route.menu);
    },
  },
  methods: {
    logout() {
      removeCurrentUser();
      this.$router.replace('/login');
    },
    pushRoute(route) {
      if (this.$router.currentRoute.path !== route.path) {
        this.$router.push(route.path);
      }
    },
  },
  template: `
  <v-navigation-drawer
    v-model="$global.drawer"
    app
  >
    <v-sheet
      color="grey lighten-4"
      class="pa-4"
      style="cursor: pointer"
      @click="pushRoute({ path: '/account' })"
    >
      <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
      >
        {{$global.user.name?.substr(0, 1)}}
      </v-avatar>

      <div class="text--primary">{{$global.user.name}}</div>
      <div class="text--secondary">{{$global.user.email}}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="route in items"
        :key="route.title"
        link
        @click="pushRoute(route)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ route.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  `,
};
