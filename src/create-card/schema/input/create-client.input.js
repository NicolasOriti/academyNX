const { InputValidation } = require('ebased/schema/inputValidation');

class CreateCardValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATE_CLIENT',
      source: meta.source,
      payload: payload,
      schema: {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { CreateCardValidation };
