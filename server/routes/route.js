const routes = require('express').Router();
const controller = require('../controller/controller');
const codeController = require('../controller/codController');


routes.route('/api/register')
    .post(controller.create_User)

routes.route('/api/login')
    .post(controller.login)

routes.route('/api/code')
    .get(codeController.getCods)
    .post(codeController.createNewCod)
routes.route('/api/code/:id')
    .delete(codeController.deleteCodeBlock)

module.exports = routes;