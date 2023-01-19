const sns = require('ebased/service/downstream/sns');

const { PURCHASE_CREATED_TOPIC_ARN } = process.env;

const publishPurchaseCreated = async (newPurchaseEvent, rawData) => {
  const { eventPayload, eventMeta } = newPurchaseEvent.get();

  const snsPublishParams = {
    TopicArn: PURCHASE_CREATED_TOPIC_ARN,
    Message: rawData,
  };

  await sns.publish(snsPublishParams, eventMeta);
};

module.exports = { publishPurchaseCreated };
