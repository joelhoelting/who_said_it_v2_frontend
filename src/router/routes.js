import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';

export default [
  { name: 'home', path: '/', component: Home },
  { name: 'play', path: '/play', component: Play },
  { name: 'signin', path: '/signin', component: Signin },
  { name: 'signup', path: '/signup', component: Signup }
];
