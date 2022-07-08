import Index from './components/Index.js';
import Posts from './components/Posts.js';
import PostAdd from './components/PostAdd.js';
import PostDetail from './components/PostDetail.js';
import PostEdit from './components/PostEdit.js';
import Account from './components/Account.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

/**
 * @typedef RouteConfigItem
 * @property {string} path
 * @property {string} title
 * @property {any} component
 * @property {RouteConfigItem} [children]
 */

/**
 * @type {RouteConfigItem[]}
 */
export const indexRoutes = [
  {
    path: '/welcome',
    title: 'Welcome',
    component: {
      name: 'welcome',
      template: `<h1>WELCOME</h1>`,
    },
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
  {
    path: '/account',
    title: 'Account',
    component: Account,
    menu: true,
  },
];

/**
 * @type {RouteConfigItem[]}
 */
export const routes = [
  {
    path: '/login',
    title: 'Login',
    component: Login,
    menu: false,
  },
  {
    path: '/register',
    title: 'Register',
    component: Register,
    menu: false,
  },
  {
    path: '/',
    redirect: '/welcome',
    title: 'Home',
    component: Index,
    menu: false,
    children: indexRoutes,
  },
];
