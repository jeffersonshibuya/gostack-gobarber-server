"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebarsMailTemplateProvider {
  async parse({
    file,
    varibles
  }) {
    const templateFileContent = await _fs.default.promises.readFile(file, {
      encoding: 'utf-8'
    });

    const parseTemplate = _handlebars.default.compile(templateFileContent);

    return parseTemplate(varibles);
  }

}

exports.default = HandlebarsMailTemplateProvider;