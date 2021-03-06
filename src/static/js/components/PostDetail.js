import { fetchPostById } from '../services/posts.js';
import { render } from '../utils/markdown.js';
import Comments from './Comments.js';

export default {
  template: `
    <div>
      <v-card elevation="2">
        <v-card-text>
          <h1 class="text--primary" v-text="detail?.title"></h1>
          <p class="text--primary">
            by {{detail?.author.name}}
          </p>
          <p class="text--primary">
            {{detail?.createdTime}}
          </p>
          <div v-html="postHtml"></div>
        </v-card-text>
      </v-card>
      <v-card class="mt-1">
        <v-card-text>
        <h3 class="text--primary">Comments</h3>
        </v-card-text>
        <comments :postId="$router.currentRoute.params.id" />
      </v-card>
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
    const { success, data } = await fetchPostById(
      this.$router.currentRoute.params.id
    );

    if (success) {
      this.detail = data;
    }
  },
  computed: {
    postHtml() {
      return this.detail ? render(this.detail.content) : 'loading...';
    },
  },
};
