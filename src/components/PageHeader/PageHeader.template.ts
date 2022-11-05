// language=html
export const template = `
  <header class="header">
    <a href="/" class="header__logo-wrapper">
      <picture class="header__logo">
        <source srcset="images/logo.webp" type="image/webp" />
        <img src="images/logo.png" alt="логотип летчат" />
      </picture>
      <span class="header__name">LetChat</span>
    </a>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="/" class="header__link">Чаты</a></li>
        <li><a href="/profile" class="header__link">Профиль</a></li>
        <li><a href="/signin" class="header__link">Вход</a></li>
        <li><a href="/404" class="header__link">404</a></li>
        <li><a href="/500" class="header__link">500</a></li>
      </ul>
    </nav>
  </header>
`;
