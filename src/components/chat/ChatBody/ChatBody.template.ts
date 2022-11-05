// language=hbs
export const template = `
    <div class="chat {{#if messages}}{{else}}chat--empty{{/if}}">
        {{#if messages}}
            {{{messageList}}}
            <div class="chat__divider"></div>
            {{{messageForm}}}
        {{else}}
            <span class="chat__empty-message">Выберите чат, чтобы отправить сообщение</span>
        {{/if}}
    </div>
`;
