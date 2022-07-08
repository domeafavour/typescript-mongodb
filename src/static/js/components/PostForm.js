export default {
  name: 'post-form',
  props: {
    values: {
      type: Object,
    },
  },
  data() {
    return { formValues: this.values };
  },
  watch: {
    values(newValues) {
      this.formValues = newValues;
    },
  },
  template: `
    <form>
      <div>
        <label>title</label>
        <input v-model="formValues.title" />
      </div>
      <div>
        <label>content</label>
        <textarea v-model="formValues.content"></textarea>
      </div>
      <button type="submit" @click.prevent="$emit('submit', formValues)">submit</button>
    </form>
  `,
};
