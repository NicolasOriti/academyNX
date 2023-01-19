const { InputValidation } = require('ebased/schema/inputValidation');

class CreatePurchaseValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'PURCHASE.CREATE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        strict: false,
        clientId: { type: String, required: true },
        products: { type: [{ name: String, price: Number }], required: true },
      },
    });
  }
}

module.exports = { CreatePurchaseValidation };
