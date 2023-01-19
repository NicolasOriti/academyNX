const { InputValidation } = require('ebased/schema/inputValidation');

class CreateCardInputValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CARD.CREATE_CARD',
      specversion: 'v1.0.0',
      source: meta.source,
      payload,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { CreateCardInputValidation };
