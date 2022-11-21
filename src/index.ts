import { renderDOM } from './core';
import { IndexPage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { PageHeader } from './components';

// eslint-disable-next-line no-restricted-globals
const { pathname } = location;

switch (pathname) {
  case '/signin':
    renderDOM('#root', new SignInPage());
    break;
  case '/signup':
    renderDOM('#root', new SignUpPage());
    break;
  case '/profile':
  case '/profile/edit-data':
  case '/profile/edit-password':
    renderDOM('#root', new PageHeader());
    renderDOM('#root', new ProfilePage());
    break;
  case '/':
    renderDOM('#root', new PageHeader());
    renderDOM('#root', new IndexPage());
    break;
  case '/error':
    renderDOM('#root', new ServerErrorPage());
    break;
  default:
    renderDOM('#root', new NotFoundPage());
}
