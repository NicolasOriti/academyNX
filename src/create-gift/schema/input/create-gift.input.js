const { InputValidation } = require('ebased/schema/inputValidation');

class CreateGiftInputValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'GIFT.CREATE_GIFT',
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

module.exports = { CreateGiftInputValidation };
