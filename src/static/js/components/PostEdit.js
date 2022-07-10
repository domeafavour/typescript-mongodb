import { fetchPostById, updatePost } from '../services/posts.js';
import PostForm from './PostForm.js';

export default {
  name: 'post-edit',
  data() {
    return { values: {} };
  },
  components: {
    PostForm,
  },
  template: `
    <v-card>
      <v-card-text>
        <h1>EDIT POST</h1>
      </v-card-text>
      <post-form :values="values" @submit="onSubmit"/>
    </v-card>
  `,
  async mounted() {
    this.values = await fetchPostById(this.$router.currentRoute.params.id);
  },
  methods: {
    async onSubmit(formValues) {
      await updatePost({
        id: formValues.id,
        title: formValues.title,
        content: formValues.content,
        description: formValues.description,
      });
      this.$router.back();
    },
  },
};
