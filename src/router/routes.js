import Home from '@/views/Home.vue';
import Play from '@/views/Play.vue';

import SignIn from '@/views/Authentication/SignIn.vue';
import SignUp from '@/views/Authentication/SignUp.vue';
import EmailConfirmation from '@/views/Authentication/EmailConfirmation.vue';
import PasswordResetRequest from '@/views/Authentication/PasswordResetRequest.vue';
import PasswordReset from '@/views/Authentication/PasswordReset.vue';

import Games from '@/views/Games';
import GamesNew from '@/views/Games/GamesNew.vue';
import GamesShow from '@/views/Games/GamesShow.vue';

import Account from '@/views/Account';
import General from '@/views/Account/General.vue';
import UpdateEmail from '@/views/Account/UpdateEmail.vue';
import UpdatePassword from '@/views/Account/UpdatePassword.vue';
import DeleteAccount from '@/views/Account/DeleteAccount.vue';

const withPrefix = (prefix, routes) =>
  routes.map(route => {
    route.path = prefix + route.path;
    return route;
  });

export default [
  { name: 'Home', path: '/', component: Home },
  { name: 'Play', path: '/play', component: Play },
  { name: 'SignIn', path: '/sign_in', component: SignIn },
  { name: 'SignUp', path: '/sign_up', component: SignUp },
  { name: 'ConfirmEmail', path: '/confirm_email/:token', component: EmailConfirmation },
  ...withPrefix('/password_reset', [
    {
      name: 'PasswordResetRequest',
      path: '/',
      component: PasswordResetRequest
    },
    {
      name: 'PasswordReset',
      path: '/:password_reset_token',
      component: PasswordReset
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
    name: 'Account',
    path: '/account',
    redirect: '/account/general',
    component: Account,
    children: [
      {
        name: 'General',
        path: 'general',
        component: General
      },
      {
        name: 'UpdateEmail',
        path: 'update_email',
        component: UpdateEmail
      },
      {
        name: 'UpdatePassword',
        path: 'update_password',
        component: UpdatePassword
      },
      {
        name: 'DeleteAccount',
        path: 'delete_account',
        component: DeleteAccount
      }
    ]
  }
];
