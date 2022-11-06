// language=hbs
export const template = `
    <div class="form-field">
        <label for="input-{{name}}" class="form-field__label">{{label}}</label>
        {{{input}}}
        {{#if hasError}}
            <span class="form-field__helper-text">{{helperText}}</span>
        {{/if}}
    </div>
`;
