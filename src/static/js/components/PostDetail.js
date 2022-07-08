import { fetchPostById } from '../services/posts.js';
import Comments from './Comments.js';

const remarkable = new Remarkable({
  html: true,
});

export default {
  template: `
    <div>
      <h1 v-text="detail?.title"></h1>
      <h5>by {{detail?.author.name}}, {{detail?.createdTime}}</h5>
      <div v-html="postHtml"></div>
      <h4>Comments:</h4>
      <comments :list="detail?.comments ?? []"></comments>
    </div>
  `,
  components: {
    Comments,
  },
  data() {
    return {
      detail: null,
    };
  },
  async mounted() {
    this.detail = await fetchPostById(this.$router.currentRoute.params.id);
  },
  computed: {
    postHtml() {
      return this.detail
        ? remarkable.render(this.detail.content)
        : 'loading...';
    },
  },
};
