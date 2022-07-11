import { fetchPosts } from './../services/posts.js';

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
            <v-list-item two-line :key="post.id">
              <v-list-item-avatar color="grey darken-1">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{post.title}}</v-list-item-title>
                <v-list-item-subtitle>{{post.description}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-col>
                    <v-btn @click="viewPost(post)">view</v-btn>
                  </v-col>
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
