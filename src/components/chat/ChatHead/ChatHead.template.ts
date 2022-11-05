// language=hbs
export const template = `
    <div class="chat-head">
        <div class="chat-head__user">
            {{{avatar}}}
            <span class="chat-head__username">{{userName}}</span>
        </div>
        <div class="chat-head__controls">
            {{{addUserButton}}}
            {{{removeUserButton}}}
        </div>
    </div>
`;
