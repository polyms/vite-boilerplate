import path from 'node:path';

export default {
  process(sourceText, sourcePath) {
    if (path.extname(sourcePath) !== '.svg') {
      return sourceText;
    }

    const name = `svg-${path.basename(sourcePath, '.svg')}`
      .split(/\W+/)
      .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
      .join('');

    return {
      code: `
const React = require('react');
function ${name}(props) {
  return React.createElement(
    'svg',
    Object.assign({}, props, {'data-file-name': ${name}.name})
  );
}
module.exports = ${name};
            `,
    };
  },
};
