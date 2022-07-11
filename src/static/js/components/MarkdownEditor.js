import { render } from './../utils/markdown.js';

export default {
  name: 'markdown-editor',
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
      value: '',
    },
  },
  template: `
    <v-row>
      <v-col cols="6">
        <v-textarea 
          auto-grow 
          auto-size 
          :label="label" 
          :value="value" 
          @input="onInput" 
        />
      </v-col>
      <v-col cols="6" v-html="valueHtml" />
    </v-row>
  `,
  methods: {
    onInput(text) {
      this.$emit('input', text);
    },
  },
  computed: {
    valueHtml() {
      return render(this.value);
    },
  },
};
