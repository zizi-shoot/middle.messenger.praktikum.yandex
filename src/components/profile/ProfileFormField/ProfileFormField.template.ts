// language=hbs
export const template = `
    <div class="profile-form-field">
        <label for="input-{{name}}" class="profile-form-field__label">{{label}}</label>
        <div class="profile-form-field__wrapper">
            {{{input}}}
            {{#if hasError}}
                <span class="profile-form-field__helper-text">{{helperText}}</span>
            {{/if}}
        </div>
    </div>
`;
