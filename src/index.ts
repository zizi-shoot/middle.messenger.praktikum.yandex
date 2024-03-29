import './vendor/normalize.css';
import './config/fonts.css';
import './config/vars.css';
import './style.css';
import { router } from './core/Router/Router';
import { ROUTES } from './utils/const';
import { IndexPage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { authController } from './controllers/AuthController';
import { store } from './core/Store';

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(ROUTES.INDEX, IndexPage)
    .use(ROUTES.SIGNIN, SignInPage)
    .use(ROUTES.SIGNUP, SignUpPage)
    .use(ROUTES.PROFILE, ProfilePage)
    .use(ROUTES.PROFILE_EDIT_DATA, ProfilePage)
    .use(ROUTES.PROFILE_EDIT_PASSWORD, ProfilePage)
    .use(ROUTES.NOT_FOUND, NotFoundPage)
    .use(ROUTES.ERROR, ServerErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTES.SIGNIN:
    case ROUTES.SIGNUP:
    case ROUTES.NOT_FOUND:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await authController.fetchUser();

    router.start();

    if (!Object.values(ROUTES).includes(window.location.pathname)) {
      router.go(ROUTES.NOT_FOUND);
    }

    if (store.getState().isAuth && !isProtectedRoute) {
      router.go(ROUTES.PROFILE);
    }

    if (!store.getState().isAuth && isProtectedRoute) {
      router.go(ROUTES.SIGNIN);
    }
  } catch (e) {
    router.start();

    router.go(ROUTES.ERROR);
  }
});
