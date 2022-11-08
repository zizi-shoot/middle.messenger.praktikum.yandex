import { renderDOM } from './core';
import { ProfilePage } from './pages/ProfilePage';

// renderDOM('#root', new PageHeader({}));
renderDOM('#root', new ProfilePage({}));
