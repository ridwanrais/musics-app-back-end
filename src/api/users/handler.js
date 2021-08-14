const autoBind = require('auto-bind');
const successResponse = require('../../successResponse');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname });

    return h.response(successResponse({
      message: 'User berhasil ditambahkan',
      data: { userId },
    }))
      .code(201);
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;
    const user = await this._service.getUserById(id);

    return successResponse({ data: { user } });
  }
}

module.exports = UsersHandler;
