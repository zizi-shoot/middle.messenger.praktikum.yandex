import { IndexPage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { router } from './core';

const ROUTES = {
  index: '/',
  signin: '/signin',
  signup: '/signup',
  profile: '/profile',
  profileEditData: '/profile/edit-data',
  profileEditPassword: '/profile/edit-password',
  error: '/error',
  notFound: '/404',
};

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(ROUTES.index, IndexPage)
    .use(ROUTES.signin, SignInPage)
    .use(ROUTES.signup, SignUpPage)
    .use(ROUTES.profile, ProfilePage)
    .use(ROUTES.profileEditData, ProfilePage)
    .use(ROUTES.profileEditPassword, ProfilePage)
    .use(ROUTES.error, ServerErrorPage)
    .use(ROUTES.notFound, NotFoundPage)
    .start();
});
