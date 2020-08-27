"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _express = require("express");

var _celebrate = require("celebrate");

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

var _ensureAuthenticate = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticate.default);
appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;