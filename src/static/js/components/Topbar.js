import { removeCurrentUser } from '../utils/user.js';

export default {
  name: 'top-bar',
  template: `
    <nav class="nav">
      <button type="button" @click="logout()">logout</button>
    </nav>
  `,
  methods: {
    logout() {
      removeCurrentUser();
      this.$router.replace('/login');
    },
  },
};
