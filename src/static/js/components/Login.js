import { login } from './../services/user.js';

export default {
  name: 'login',
  data: () => ({
    loading: false,
    email: '',
    password: '',
  }),
  template: `
  <v-app>
    <v-container>
      <v-form>
        <v-card outlined>
          <v-card-title>Login</v-card-title>
          <v-container>
            <v-text-field
              label="Email"
              v-model="email"
              type="email"
              name="email"
            />
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              name="password"
            />
          </v-container>
          <v-card-actions>
            <v-btn
              text
              color="primary" 
              type="submit" 
              @click.prevent="handleLogin"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-app>
  `,
  methods: {
    resetForm() {
      this.email = '';
      this.password = '';
    },
    async handleLogin() {
      try {
        this.loading = true;
        const { success, data: user } = await login({
          email: this.email,
          password: this.password,
        });
        if (success) {
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
