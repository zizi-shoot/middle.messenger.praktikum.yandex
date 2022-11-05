// language=hbs
export const template = `
    <form class="{{class}} message-form">
        <label class="message-form__label" for="message">Введите сообщение</label>
        {{{input}}}
        <button class="message-form__attach-btn" type="button">
            {{{attachIcon}}}
        </button>
        {{{sentButton}}}
    </form>
`;
