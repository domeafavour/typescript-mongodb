import {
  createComment,
  deleteComment,
  fetchComments,
} from '../services/comments.js';
import { render } from '../utils/markdown.js';

export default {
  props: {
    postId: {
      type: String,
    },
  },
  template: `
    <div>
      <v-list>
        <template v-for="(comment, index) in htmlComments">
          <v-list-item two-line :key="comment.id">
            <v-list-item-avatar color="grey darken-1">
              </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>@{{comment?.user?.name}}</v-list-item-title>
              <div class="text--primary" v-html="comment.html"></div>
            </v-list-item-content>
            <v-list-item-action v-if="$global.user.id === comment.user.id">
              <v-icon color="red" @click="removeComment(comment)">mdi-delete</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < list.length - 1"
            inset
          />
        </template>
      </v-list>
      <v-container v-if="formVisible">
        <v-form>
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Leave your comment"
            v-model="title"
          />
          <v-btn
            color="primary"
            :loading="loading"
            @click="submit"
          >
            Submit
          </v-btn>
          <v-btn @click="formVisible = false">cancel</v-btn>
        </v-form>
      </v-container>
      <v-container v-if="!formVisible">
        <v-btn @click="formVisible = true">ADD</v-btn>
      </v-container>
    </div>
  `,
  data() {
    return {
      title: '',
      list: [],
      formVisible: false,
      loading: false,
    };
  },
  async mounted() {
    await this.reloadComments();
  },
  computed: {
    htmlComments() {
      return this.list.map((comment) => ({
        ...comment,
        html: render(comment.title),
      }));
    },
  },
  methods: {
    async reloadComments() {
      this.list = await fetchComments(this.postId);
    },
    async removeComment(comment) {
      await deleteComment(comment.id);
      this.reloadComments();
    },
    async submit() {
      try {
        this.loading = true;
        await createComment({
          postId: this.postId,
          title: this.title,
        });
        this.reloadComments();
        this.title = '';
        this.formVisible = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
