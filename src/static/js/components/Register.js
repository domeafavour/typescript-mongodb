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
  <v-app>
    <v-container>
      <v-form>
        <v-card outlined>
          <v-card-title>Register</v-card-title>
          <v-container>
            <v-text-field label="Email" v-model="email" type="email" name="email" />
            <v-text-field label="Name" v-model="name" name="name" />
            <v-text-field label="Password" v-model="password" type="password" name="password" />
          </v-container>
          <v-card-actions>
            <v-btn text color="primary" type="submit" @click.prevent="handleRegister">
              Register
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
          this.$router.replace('/login');
        } else {
          this.resetForm();
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
