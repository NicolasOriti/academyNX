const dynamo = require('ebased/service/storage/dynamo');

const createPurchaseService = async (newPurchase) => {
  const purchase = await dynamo.putItem({
    TableName: process.env.PURCHASE_TABLE,
    Item: newPurchase,
  });

  return purchase.Item;
};

module.exports = { createPurchaseService };
