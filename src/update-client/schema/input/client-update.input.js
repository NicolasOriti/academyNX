const { InputValidation } = require('ebased/schema/inputValidation');

class UpdateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.UPDATE_CLIENT',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { UpdateClientValidation };
