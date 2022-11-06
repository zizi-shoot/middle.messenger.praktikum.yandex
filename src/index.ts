import { renderDOM } from './core';
import { PageHeader } from './components';
import { IndexPage } from './pages/IndexPage';

renderDOM('#root', new PageHeader({}));
renderDOM('#root', new IndexPage({}));
