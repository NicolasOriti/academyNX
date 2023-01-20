const dynamo = require('ebased/service/storage/dynamo');

async function updateClientService(commandPayload, clientId) {
  const Key = { dni: clientId };

  const updateExpressions = [];
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  Object.keys(commandPayload).forEach((property) => {
    if (commandPayload[property] === undefined) return;
    updateExpressions.push(`#${property}=:${property}`);
    ExpressionAttributeNames[`#${property}`] = property;
    ExpressionAttributeValues[`:${property}`] = commandPayload[property];
  });
  if (!updateExpressions.length) {
    throw new Error('Nothing to update');
  }
  const UpdateExpression = `SET ${updateExpressions.join(', ')}`;

  const params = {
    TableName: process.env.CLIENTS_TABLE,
    Key,
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  const client = await dynamo.updateItem(params);

  console.log('************This is client', client.Attributes);

  return client.Attributes;
}

module.exports = { updateClientService };
