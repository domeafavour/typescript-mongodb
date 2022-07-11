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
      <v-card-title>
        EDIT POST
      </v-card-title>
      <post-form :values="values" @submit="onSubmit"/>
    </v-card>
  `,
  async mounted() {
    const { success, data } = await fetchPostById(
      this.$router.currentRoute.params.id
    );
    if (success) {
      this.values = data;
    }
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
