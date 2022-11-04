// language=hbs
export const template = `
    <input
            type="{{#if type}}{{type}}{{else}}text{{/if}}"
            id="input-{{name}}"
            placeholder="{{placeholder}}"
            class="input {{class}} {{#if hasError}}input--error{{/if}} {{#if halfWidth}}input--half-width{{/if}}"
            name="{{name}}"
    >
`;
