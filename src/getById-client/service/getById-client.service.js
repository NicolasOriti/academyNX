const dynamo = require('ebased/service/storage/dynamo');

async function getByIdClientService(clientId) {
  const { Item } = await dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: clientId },
  });

  return Item;
}

module.exports = { getByIdClientService };
