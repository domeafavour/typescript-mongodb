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
    <div>
      <h1>EDIT POST</h1>
      <post-form :values="values" @submit="onSubmit"/>
    </div>
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
        author: formValues.author.id,
      });
      this.$router.back();
    },
  },
};
