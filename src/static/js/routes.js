import Index from './components/Index.js';
import Posts from './components/Posts.js';
import PostAdd from './components/PostAdd.js';
import PostDetail from './components/PostDetail.js';
import PostEdit from './components/PostEdit.js';

/**
 * @type {{ path: string; title: string; component: object; menu: boolean }[]}
 */
export const routes = [
  {
    path: '/',
    title: 'Home',
    component: Index,
    menu: true,
  },
  {
    path: '/posts',
    title: 'Posts',
    component: Posts,
    menu: true,
  },
  {
    path: '/posts/add',
    title: 'Post Add',
    component: PostAdd,
    menu: false,
  },
  {
    path: '/posts/:id',
    title: 'Post Detail',
    component: PostDetail,
    menu: false,
  },
  {
    path: '/posts/:id/edit',
    title: 'Post Edit',
    component: PostEdit,
    menu: false,
  },
];
