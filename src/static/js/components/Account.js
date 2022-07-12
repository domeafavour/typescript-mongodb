import { fetchCurrent, updateCurrent } from './../services/user.js';

const template = `
<v-container>
  <v-form>
    <v-card outlined>
      <v-card-title>Account</v-card-title>
      <v-container>
        <v-text-field label="Email" v-model="email" type="email" name="email" disabled />
        <v-text-field label="Name" v-model="name" name="name" />
      </v-container>
      <v-card-actions>
        <v-btn text color="primary" type="submit" @click.prevent="handleSubmit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</v-container>
`;

export default {
  name: 'account',
  template,
  data: () => ({
    email: '',
    name: '',
  }),
  async mounted() {
    await this.loadUser();
  },
  methods: {
    async loadUser() {
      const { success, data } = await fetchCurrent();
      if (success) {
        this.email = data.email;
        this.name = data.name;
        this.$global.user = data;
      }
    },
    async handleSubmit() {
      const { success } = await updateCurrent({
        email: this.email,
        name: this.name,
      });
      if (success) {
        this.loadUser();
      }
    },
  },
};
