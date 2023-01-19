const dynamo = require('ebased/service/storage/dynamo');

async function createClientService(commandPayload) {
  const client = await dynamo.putItem({
    TableName: process.env.CLIENTS_TABLE,
    Item: commandPayload,
  });

  return client.Item;
}

module.exports = { createClientService };
