const sns = require('ebased/service/downstream/sns');

async function publishClientUpdated(clientUpdatedEvent) {
  const { eventPayload, eventMeta } = clientUpdatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENT_UPDATED_TOPIC,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { publishClientUpdated };
