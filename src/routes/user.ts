import Router from 'koa-router';
import { fetchCurrent, login, register } from '../controllers/user';

const router = new Router({
  prefix: '/user/',
});

router.post('login', login);
router.post('register', register);
router.get('current/:id', fetchCurrent);

export default router;
