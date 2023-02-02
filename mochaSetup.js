const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM(
  // language=html
  `
    <!DOCTYPE html>
    <html lang="ru">
    <body>
      <div id="root"></div>
    </body>
    </html>
  `,
  { url: 'http://localhost:3000' }
);

global.window = window;
global.document = window.document;

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
}
