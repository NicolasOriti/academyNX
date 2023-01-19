const sns = require('ebased/service/downstream/sns');

async function publishBirthUpdated(event) {
  const { eventPayload, eventMeta } = event.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENT_BIRTH_UPDATED_TOPIC,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { publishBirthUpdated };
