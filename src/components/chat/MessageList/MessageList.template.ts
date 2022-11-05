// language=hbs
export const template = (list: string[]) => `
    <ul class="{{class}} message-list">
        ${list.map((id) => `{{{${id}}}}`).join('')}
    </ul>
`;
