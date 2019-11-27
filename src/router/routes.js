import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';
import GameNew from '@/views/Games/GameNew.vue';
import Games from '@/views/Games';

export default [
  { name: 'Home', path: '/', component: Home },
  { name: 'Play', path: '/play', component: Play },
  { name: 'SignIn', path: '/signin', component: Signin },
  { name: 'SignUp', path: '/signup', component: Signup },
  {
    name: 'Games',
    path: '/games',
    component: Games,
    children: [{ name: 'GameNew', path: 'new', component: GameNew }]
  }
];
