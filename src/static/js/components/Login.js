import { login } from './../services/user.js';

export default {
  name: 'login',
  data: () => ({
    loading: false,
    email: '',
    password: '',
  }),
  template: `
    <form>
      <div>
        <label for="email">email</label>
        <input id="email" type="email" name="email" v-model="email"  />
      </div>
      <div>
        <label for="password">password</label>
        <input id="password" type="password" name="password" v-model="password" />
      </div>
      <div>
        <button type="submit" @click.prevent="handleLogin">login</button>
      </div>
    </form>
  `,
  methods: {
    resetForm() {
      this.email = '';
      this.password = '';
    },
    async handleLogin() {
      try {
        this.loading = true;
        const user = await login({
          email: this.email,
          password: this.password,
        });
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.$router.replace('/');
        } else {
          this.resetForm();
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
