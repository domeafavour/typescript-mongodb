import { createPost } from '../services/posts.js';
import PostForm from './PostForm.js';

export default {
  name: 'post-add',
  data() {
    return {
      values: {
        title: '',
        description: '',
        content: '',
      },
    };
  },
  components: {
    PostForm,
  },
  template: `
    <v-card>
      <v-card-title>
        ADD POST
      </v-card-title>
      <post-form :values="values" @submit="submit"/>
    </v-card>
  `,
  methods: {
    async submit() {
      await createPost(this.values);
      this.$router.back();
    },
  },
};
