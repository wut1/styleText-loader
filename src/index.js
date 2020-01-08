import path from 'path';

import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

const loaderApi = () => {};

loaderApi.pitch = function loader(request) {
  const options = loaderUtils.getOptions(this);

  validateOptions(schema, options, {
    name: 'StyleText Loader',
    baseDataPath: 'options',
  });
  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : false;
    delete options.esModule;

      return `
        ${
          esModule
            ? `import content from ${loaderUtils.stringifyRequest(
                this,
                `!!${request}`
              )};`
            : `var content = require(${loaderUtils.stringifyRequest(
                this,
                `!!${request}`
              )});

              content = content.__esModule ? content.default : content;`
        }
        var exported = {};
       
          exported.cssText = content.toString();
            if (content.locals) {
              exported.styles = content.locals;
            }
        
        ${esModule ? 'export default' : 'module.exports ='} exported;
      `;
};

export default loaderApi;
