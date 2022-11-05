import { renderDOM } from './core';
import { IndexPage } from './pages/IndexPage';
import { PageHeader } from './components';

renderDOM('#root', new PageHeader({}));
renderDOM('#root', new IndexPage({}));
