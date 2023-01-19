const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientUpdatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.UPDATE_CLIENT',
      specversion: 'v1.0.0',
      payload: payload,
      meta: meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { ClientUpdatedEvent };
