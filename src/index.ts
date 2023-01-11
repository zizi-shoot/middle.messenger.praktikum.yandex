import { IndexPage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { router } from './core/Router';
import { authController } from './controllers/AuthController';
import { ROUTES } from './utils/const';
import { messagesController } from './controllers/MessagesController';
import { chatController } from './controllers/ChatController';

window.addEventListener('DOMContentLoaded', async () => {
  // TODO удалить перед PR
  // @ts-ignore
  window.messageController = messagesController;
  // @ts-ignore
  window.chatController = chatController;
  router
    .use(ROUTES.INDEX, IndexPage)
    .use(ROUTES.SIGNIN, SignInPage)
    .use(ROUTES.SIGNUP, SignUpPage)
    .use(ROUTES.PROFILE, ProfilePage)
    .use(ROUTES.PROFILE_EDIT_DATA, ProfilePage)
    .use(ROUTES.PROFILE_EDIT_PASSWORD, ProfilePage)
    .use(ROUTES.ERROR, ServerErrorPage)
    .use(ROUTES.NOT_FOUND, NotFoundPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTES.SIGNIN:
    case ROUTES.SIGNUP:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await authController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(ROUTES.PROFILE);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(ROUTES.SIGNIN);
    }
  }
});
