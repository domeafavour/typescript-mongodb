export default {
  name: 'top-bar',
  data: () => ({
    showBack: true,
  }),
  template: `
    <nav>
      <button v-show="showBack" @click="goBack">back</button>
    </nav>
  `,
  methods: {
    goBack() {
      this.$router.back();
    }
  },
};
