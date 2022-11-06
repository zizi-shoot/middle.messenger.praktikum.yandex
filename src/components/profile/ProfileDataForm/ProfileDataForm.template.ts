// language=hbs
export const template = (fieldNames: string[]) => `
    <form class="profile__form profile-form">
        ${fieldNames.map((inputName) => `{{{${inputName}}}}`).join('')}
        {{{button}}}
    </form>
`;
