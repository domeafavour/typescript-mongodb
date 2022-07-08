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
      return this.routes.filter(route => route.menu)
    }
  },
  template: `
    <ul>
      <li v-for="route in items" :key="route.path">
        <router-link :to="route.path">{{route.title}}</router-link>
      </li>
    </ul>
  `,
};
