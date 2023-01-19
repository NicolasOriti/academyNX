const uuid = require('uuid');

const dynamo = require('ebased/service/storage/dynamo');

const { PurchaseCreatedEvent } = require('../schema/event/created-purchase.event');
const { CreatePurchaseValidation } = require('../schema/input/create-purchase.input');

const { createPurchaseService } = require('../service/create-purchase.service');
const { publishPurchaseCreated } = require('../service/publish-purchase-created.service');

const createPurshaseDomain = async (commandPayload, commandMeta) => {
  new CreatePurchaseValidation(commandPayload, commandMeta);

  console.info('Se valido bien el input');

  const { Item: client } = await dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.clientId },
  });

  console.log('********ESTE ES CLIENT', client);

  if (!client || client.enable === false) {
    return { status: 400, body: 'No se encontro el cliente' };
  }

  const purchase = {};
  purchase.uuid = uuid.v4();
  purchase.clientId = commandPayload.clientId;
  purchase.products = commandPayload.products.map((product) => {
    let finalPrice;

    switch (client.creditCard.type) {
      case 'Classic':
        finalPrice = product.price * 0.92;
        break;
      case 'Gold':
        finalPrice = product.price * 0.88;
        break;
      default:
        finalPrice = product.price;
    }

    return { ...product, finalPrice };
  });

  const purchaseCreated = await createPurchaseService(purchase);
  console.log(purchaseCreated);
  await publishPurchaseCreated(
    new PurchaseCreatedEvent(purchaseCreated, commandMeta),
    purchaseCreated
  );

  return { body: purchaseCreated };
};

module.exports = {
  createPurshaseDomain,
};
