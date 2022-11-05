// language=hbs
export const template = (inputs: string[]) => `
    <main class="main">
        <section class="entry">
            <picture class="entry__logo">
                <source srcset="images/logo.webp" type="image/webp" />
                <img src="images/logo.png" alt="логотип летчат" />
            </picture>
            <h1 class="entry__title">Регистрация</h1>
            <p class="entry__helper-text">
                Уже есть аккаунт?
                <a class="link" href="/signin">Войти</a></p>
            <form class="entry__form entry-form shadow">
                ${inputs.map((inputName: string) => `{{{${inputName}}}}`).join('')}
                {{{button}}}
            </form>
        </section>
    </main>
`;
