// language=hbs
export const template = `
    <main class="profile-main">
        <h1 class="visually-hidden">Страница профиля</h1>
        <div class="profile">
            <a class="profile__avatar" href="#">{{{avatar}}}</a>
            <h2 class="profile__username">Иван Иванов</h2>
            {{{button}}}
            {{{content}}}
        </div>
    </main>
`;
