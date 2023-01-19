const dynamo = require('ebased/service/storage/dynamo');

async function getAllClientService() {
  return (await dynamo.scanTable({ TableName: process.env.CLIENTS_TABLE })).Items;
}

module.exports = { getAllClientService };
