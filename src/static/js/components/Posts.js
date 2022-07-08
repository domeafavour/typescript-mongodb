import { fetchPosts } from './../services/posts.js';

export default {
  template: `
    <div>
      <router-link to="/posts/add">New Post</router-link>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="'/posts/' + post.id">{{post.title}}</router-link>
          <button>
            <router-link :to="'/posts/' + post.id + '/edit'">EDIT</router-link>
          </button>
        </li>
      </ul>
    </div>
  `,
  data() {
    return { posts: [] };
  },
  async mounted() {
    this.posts = await fetchPosts();
  },
};
