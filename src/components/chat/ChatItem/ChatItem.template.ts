// language=hbs
export const template = `
    <li class="chat-item">
        {{{avatar}}}
        <div class="chat-item__message-wrapper">
            <span class="chat-item__username">{{userName}}</span>
            <p class="chat-item__message">{{message}}</p>
        </div>
        <div class="chat-item__meta">
            <span class="chat-item__time">{{time}}</span>
            {{#if counter}}
                <span class="chat-item__counter">{{counter}}</span>
            {{/if}}
        </div>
    </li>
`;
