// language=hbs
export const template = `
    <div class="chat {{#if hasMessages}}{{else}}chat--empty{{/if}}">
        {{#if hasMessages}}
            {{{messageList}}}
            <div class="chat__divider"></div>
            {{{messageForm}}}
        {{else}}
            <span class="chat__empty-message">Выберите чат, чтобы отправить сообщение</span>
        {{/if}}
    </div>
`;
