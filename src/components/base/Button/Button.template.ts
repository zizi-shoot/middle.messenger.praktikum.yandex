// language=hbs
export const template = `
    <button
            type="{{#if type}}{{type}}{{else}}button{{/if}}"
            class="{{class}} button {{#if fullWidth}}button--full-width{{/if}} button--{{mode}}"
    >
        {{{ icon }}}
        {{text}}
    </button>
`;
