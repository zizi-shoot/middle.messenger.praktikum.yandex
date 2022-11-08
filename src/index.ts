import { renderDOM } from './core';
import { PageHeader } from './components';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { IndexPage } from './pages/IndexPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';

// eslint-disable-next-line no-restricted-globals
const { pathname } = location;

switch (pathname) {
  case '/signin':
    // хэдер добавлен временно для навигации по остальным страницам
    renderDOM('#root', new PageHeader({}));
    renderDOM('#root', new SignInPage({}));
    break;
  case '/signup':
    // хэдер добавлен временно для навигации по остальным страницам
    renderDOM('#root', new PageHeader({}));
    renderDOM('#root', new SignUpPage({}));
    break;
  case '/profile':
  case '/profile/edit-data':
  case '/profile/edit-password':
    renderDOM('#root', new PageHeader({}));
    renderDOM('#root', new ProfilePage({}));
    break;
  case '/':
    renderDOM('#root', new PageHeader({}));
    renderDOM('#root', new IndexPage({}));
    break;
  case '/error':
    renderDOM('#root', new ServerErrorPage({}));
    break;
  default:
    renderDOM('#root', new NotFoundPage({}));
}
