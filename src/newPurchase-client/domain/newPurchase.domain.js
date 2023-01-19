const dynamo = require('ebased/service/storage/dynamo');
const { NewClientPurchaseValidation } = require('../schema/input/newPurchase.input');

const { updatePoint } = require('../service/newPurchase.service');

function calculateNewPoints(products) {
  return products
    .map((product) => Math.trunc(product.finalPrice / 200))
    .reduce((preV, curV) => preV + curV, 0);
}

const newPurchaseDomain = async (eventPayload, eventMeta) => {
  const payload = JSON.parse(eventPayload.Message);
  new NewClientPurchaseValidation(payload, eventMeta);

  const { Item: client } = await dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: payload.clientId },
  });

  let points = client.points || 0;

  points = points + calculateNewPoints(payload.products);

  console.log('********************CLIENT', client);
  console.log('********************POINTS', points);

  await updatePoint(client.dni, points);

  return { body: points };
};

module.exports = {
  newPurchaseDomain,
};
