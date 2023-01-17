const dynamo = require('ebased/service/storage/dynamo');

async function createClientService(commandPayload) {
  await dynamo.putItem({
    TableName: process.env.CLIENTS_TABLE,
    Item: commandPayload
  });
}

module.exports = { createClientService };