import { getCurrentUser } from '../utils/user.js';

export default {
  name: 'welcome',
  template: `<h1>WELCOME, {{user.name}}</h1>`,
  data() {
    const user = getCurrentUser();
    return { user: user ?? {} };
  },
};
