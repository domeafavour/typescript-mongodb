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
                <v-list-item-title link>{{post.title}}</v-list-item-title>
                <v-list-item-subtitle>{{post.description}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-col v-if="$global.user.id === post.author.id">
                    <v-btn color="success" @click="editPost(post)">edit</v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="index < posts.length - 1"
              :key="post.path"
              inset
            />
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
    this.posts = await fetchPosts();
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
