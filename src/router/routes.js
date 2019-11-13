import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';

export default [
  { path: '/', component: Home },
  { path: '/play', component: Play },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup }
];
