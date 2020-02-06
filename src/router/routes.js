import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';
import Signin from '@/views/Authentication/Signin.vue';
import Signup from '@/views/Authentication/Signup.vue';
import PasswordReset from '@/views/Authentication/PasswordReset.vue';
import GameNew from '@/views/Games/GameNew.vue';
import Games from '@/views/Games';

const withPrefix = (prefix, routes) =>
  routes.map(route => {
    route.path = prefix + route.path;
    return route;
  });

export default [
  { name: 'Home', path: '/', component: Home },
  { name: 'Play', path: '/play', component: Play },
  { name: 'SignIn', path: '/signin', component: Signin },
  { name: 'SignUp', path: '/signup', component: Signup },
  { name: 'PasswordReset', path: '/password_reset', component: PasswordReset },
  ...withPrefix('/games', [
    {
      name: 'GamesIndex',
      path: '/',
      component: Games
    },
    {
      name: 'GameNew',
      path: '/new',
      component: GameNew
    }
  ])
];
