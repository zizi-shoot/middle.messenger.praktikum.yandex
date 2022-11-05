// language=hbs
export const template = (list: string[]) => `
    <ul class="chat-list">
        ${list.map((chatName) => `{{{${chatName}}}}`).join('')}
    </ul>
`;
