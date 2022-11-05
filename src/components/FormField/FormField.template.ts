// language=hbs
export const template = `
    <div class="form-field">
        <label for="input-{{name}}" class="form-field__label">{{label}}</label>
        {{{input}}}
        {{#if helper-text}}
            <span class="form-field__helper-text">{{helper-text}}</span>
        {{/if}}
    </div>
`;
