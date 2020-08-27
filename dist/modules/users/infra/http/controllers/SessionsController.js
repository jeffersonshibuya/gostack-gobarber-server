"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async authenticate(request, response) {
    const authUserService = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      email,
      password
    } = request.body;
    const {
      user,
      token
    } = await authUserService.execute({
      email,
      password
    });
    return response.send({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = SessionsController;