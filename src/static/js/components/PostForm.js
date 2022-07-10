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
    <v-container>
      <v-form>
        <v-text-field
          v-model="formValues.title"
          label="Title"
          required
        />
        <v-text-field
          v-model="formValues.description"
          label="Description"
          required
        />
        <v-textarea
          clearable
          clear-icon="mdi-close-circle"
          label="Content"
          v-model="formValues.content"
        />
        <v-btn
          color="primary"
          @click.prevent="$emit('submit', formValues)"
        >
          Submit
        </v-btn>
      </v-form>
    </v-container>
  `,
};
