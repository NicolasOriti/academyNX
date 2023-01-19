const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class PurchaseCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    console.log('payload in validator: ', payload);
    super({
      type: 'PURCHASE.CREATED',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        clientId: { type: String, required: true },
        uuid: { type: String, required: true },
        products: { type: [{ name: String, price: Number, finalPrice: Number }], required: true },
      },
    });
  }
}

module.exports = { PurchaseCreatedEvent };
