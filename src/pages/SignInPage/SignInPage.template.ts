// language=hbs
export const template = `
    <main class="main">
        <section class="entry">
            <picture class="entry__logo">
                <source srcset="images/logo.webp" type="image/webp" />
                <img src="images/logo.png" alt="логотип летчат" />
            </picture>
            <h1 class="entry__title">Вход в аккаунт</h1>
            <p class="entry__helper-text">
                Ещё нет аккаунта?
                <a class="link" href="/signup">Зарегистрироваться</a>
            </p>
            <form class="entry__form entry-form shadow">
                {{{login}}}
                {{{password}}}
                {{{button}}}
            </form>
        </section>
    </main>
`;
