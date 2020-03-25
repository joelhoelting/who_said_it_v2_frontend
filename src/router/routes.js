import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';

import Signin from '@/views/Authentication/Signin.vue';
import Signup from '@/views/Authentication/Signup.vue';
import EmailConfirmation from '@/views/Authentication/EmailConfirmation.vue';
import PasswordReset from '@/views/Authentication/PasswordReset.vue';
import PasswordResetConfirmation from '@/views/Authentication/PasswordResetConfirmation.vue';

import Games from '@/views/Games';
import GamesNew from '@/views/Games/GamesNew.vue';
import GamesShow from '@/views/Games/GamesShow.vue';

import Settings from '@/views/Settings';
import Profile from '@/views/Settings/Profile.vue';
import Security from '@/views/Settings/Security.vue';
import Account from '@/views/Settings/Account.vue';

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
  { name: 'ConfirmEmail', path: '/confirm_email/:token', component: EmailConfirmation },
  ...withPrefix('/password_reset', [
    {
      name: 'PasswordReset',
      path: '/',
      component: PasswordReset
    },
    {
      name: 'PasswordResetConfirmation',
      path: '/:token',
      component: PasswordResetConfirmation
    }
  ]),
  ...withPrefix('/games', [
    {
      name: 'GamesIndex',
      path: '/',
      component: Games
    },
    {
      name: 'GamesNew',
      path: '/new',
      component: GamesNew
    },
    {
      name: 'GamesShow',
      path: '/:id',
      component: GamesShow
    }
  ]),
  {
    name: 'Settings',
    path: '/settings',
    redirect: '/settings/profile',
    component: Settings,
    children: [
      {
        name: 'Profile',
        path: 'profile',
        component: Profile
      },
      {
        name: 'Security',
        path: 'security',
        component: Security
      },
      {
        name: 'Account',
        path: 'account',
        component: Account
      }
    ]
  }
];
