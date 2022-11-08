import { renderDOM } from './core';
import { SignInPage } from './pages/SignInPage';

// renderDOM('#root', new PageHeader({}));
renderDOM('#root', new SignInPage({}));
