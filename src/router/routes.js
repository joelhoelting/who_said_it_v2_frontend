import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';

export default [
  { path: '/', component: Home },
  { path: '/play', component: Play },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
];
