export default {
  name: 'item-avatar',
  props: {
    user: {
      type: Object,
      default: {
        name: '',
      },
    },
  },
  template: `
    <v-list-item-avatar color="pink">
      {{user.name.substring(0, 1)}}
    </v-list-item-avatar>
  `,
};
