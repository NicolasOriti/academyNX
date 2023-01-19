const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class BirthUpdatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.BIRTH_UPDATED',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { BirthUpdatedEvent };
