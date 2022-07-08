import { register } from './../services/user.js';

export default {
  name: 'register',
  data: () => ({
    loading: false,
    email: '',
    password: '',
    name: '',
  }),
  template: `
    <form>
      <div>
        <label for="email">email</label>
        <input id="email" type="email" name="email" v-model="email"  />
      </div>
      <div>
        <label for="name">name</label>
        <input id="name" name="name" v-model="name"  />
      </div>
      <div>
        <label for="password">password</label>
        <input id="password" type="password" name="password" v-model="password" />
      </div>
      <div>
        <button type="submit" @click.prevent="handleRegister">register</button>
      </div>
    </form>
  `,
  methods: {
    resetForm() {
      this.email = '';
      this.password = '';
      this.name = '';
    },
    async handleRegister() {
      try {
        this.loading = true;
        const success = await register({
          email: this.email,
          name: this.name,
          password: this.password,
        });
        if (success) {
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
