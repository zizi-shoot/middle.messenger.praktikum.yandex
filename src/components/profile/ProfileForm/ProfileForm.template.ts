// language=hbs
export const template = (fields: string[]) => `
    <form class="profile__form profile-form">
        ${fields.map((fieldName) => `{{{${fieldName}}}}`).join('')}
        {{{button}}}
    </form>
`;
