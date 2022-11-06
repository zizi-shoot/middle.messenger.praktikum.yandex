import { renderDOM } from './core';
import { PageHeader } from './components';
import { ProfilePage } from './pages/ProfilePage';

renderDOM('#root', new PageHeader({}));
renderDOM('#root', new ProfilePage({}));
