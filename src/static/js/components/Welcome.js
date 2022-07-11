import { render } from './../utils/markdown.js';

export default {
  name: 'welcome',
  template: `
  <v-row dense>
    <v-col cols="12" v-for="post in posts">
      <v-card>
        <v-card-title v-text="post.title" />
        <v-card-subtitle v-text="post.description" />
        <v-card-text v-html="post.html" />
        <v-card-actions>
          <v-btn text color="green" @click="$router.push('/posts/' + post.id + '/edit')">
            edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  `,
  computed: {
    loading() {
      return !this.$global.user.id;
    },
    posts() {
      return this.$global.user.posts.map((post) => ({
        ...post,
        html: render(post.content),
      }));
    },
  },
};
