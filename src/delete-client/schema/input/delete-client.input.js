const { InputValidation } = require('ebased/schema/inputValidation');

class DeleteClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.DELETE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        strict: false,
        id: { type: String, required: true },
      },
    });
  }
}

module.exports = { DeleteClientValidation };
