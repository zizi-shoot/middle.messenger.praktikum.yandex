// language=hbs
export const template = `
    <div class="profile-form-field">
        <label for="input-{{name}}" class="profile-form-field__label">{{label}}</label>
        {{{input}}}
        {{#if hasError}}
            <span class="profile-form-field__helper-text">{{helperText}}</span>
        {{/if}}
    </div>
`;
