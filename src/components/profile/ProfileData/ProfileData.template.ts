// language=hbs
export const template = (items: string[]) => `
    <div>
        <ul class="profile__data">
            ${items.map((itemName) => `{{{${itemName}}}}`).join('')}
        </ul>
        <nav class="profile__nav">
            <a href="/profile/edit-data" class="link">Изменить данные</a>
            <a href="/profile/edit-password" class="link">Изменить пароль</a>
            <a href="/signin" class="link link--warning">Выйти</a>
        </nav>
    </div>
`;
