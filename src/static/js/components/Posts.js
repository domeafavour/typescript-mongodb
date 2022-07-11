import { fetchPosts } from './../services/posts.js';
import ItemAvatar from './ItemAvatar.js';

export default {
  template: `
  <div style="position: relative">
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      @click="$router.push('/posts/add')"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-card>
      <v-list>
        <template v-for="(post, index) in posts">
          <v-list-item two-line :key="post.id" link @click="viewPost(post)">
            <item-avatar :user="post.author" />
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle v-text="post.description" />
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ post.commentsCount }} comments</v-list-item-action-text>
              <v-icon
                v-if="$global.user.id === post.author.id"
                color="success lighten-1"
                @click="editPost(post)"
              >
                mdi-pencil
              </v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < posts.length - 1" :key="post.path" inset />
        </template>
      </v-list>
    </v-card>
  </div>
  `,
  components: {
    ItemAvatar,
  },
  data() {
    return { posts: [] };
  },
  async mounted() {
    const { success, data: posts } = await fetchPosts();
    if (success) {
      this.posts = posts;
    }
  },
  methods: {
    viewPost(post) {
      this.$router.push(`/posts/${post.id}`);
    },
    editPost(post) {
      this.$router.push(`/posts/${post.id}/edit`);
    },
  },
};
