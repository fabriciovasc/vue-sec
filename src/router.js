import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import Profiles from '@/views/Profiles';
import Login from '@/views/Login';
import Home from '@/views/Home';

Vue.use(Router)

const loginGuard = async (to, from, next) => {
  try {
    const hasUser = await store.state.usuario;
    console.log('hasUser', hasUser)
    if (!hasUser) throw new Error('User is not permission');
    await next();
  } catch (e) {
    console.log('erro')
    console.log('catch')
    await next({
      path: '/login'
    });
  }
}

const adminGuard = async (to, from, next) => {
  try {
    const user = await store.state.usuario;
    const isAdmin = user && user.auth && user.auth === 'ROLE_ADMIN';
    console.log('hasUser', user, isAdmin)
    if (!isAdmin) return new Error('User is not permission');
    await next();
  } catch (e) {
    console.log('catch')
    await next({
      path: '/home'
    });
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: loginGuard
    },
    {
      path: '/profiles',
      component: Profiles,
      beforeEnter: loginGuard, adminGuard
    }
  ]
})
export default router
