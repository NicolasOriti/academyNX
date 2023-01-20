const { InputValidation } = require('ebased/schema/inputValidation');

class NewClientPurchaseValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.NEW_PURCHASE',
      specversion: 'v1.0.0',
      source: meta.source,
      payload,
      schema: {
        strict: false,
        clientId: { type: String, required: true },
        uuid: { type: String, required: true },
        products: { type: [{ name: String, price: Number, finalPrice: Number }], required: true },
      },
    });
  }
}

module.exports = { NewClientPurchaseValidation };
