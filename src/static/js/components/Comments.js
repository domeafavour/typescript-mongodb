export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  template: `
    <ul>
      <li v-for="comment in list" :key="comment.id">
        {{comment.title}} <small>from <strong>{{comment.user.name}}</strong></small>
      </li>
    </ul>
  `,
};
