const DYNAMODB = require('aws-sdk/clients/dynamodb');

const dynamodb = new DYNAMODB({
  region: 'us-east-1',
});

const createGiftService = async (client) => {
  const season = getSeason(new Date(client.birth).getMonth() + 1);
  let gift;

  switch (season) {
    case 'spring':
      gift = 'Camisa';
      break;
    case 'winter':
      gift = 'Sweater';
      break;
    case 'autum':
      gift = 'Buzo';
      break;
    default:
      gift = 'Remera';
  }
  console.info('gift created', gift);

  await save(client.dni, gift);

  return gift;
};

const getSeason = (month) => {
  if (3 >= month && month <= 5) {
    return 'autum';
  }

  if (6 >= month && month <= 8) {
    return 'winter';
  }

  if (9 >= month && month <= 11) {
    return 'spring';
  }

  return 'summer';
};

const save = async (clientId, gift) => {
  const dbParams = {
    ExpressionAttributeNames: {
      '#G': 'gift',
    },
    ExpressionAttributeValues: {
      ':g': {
        S: gift,
      },
    },
    Key: {
      dni: {
        S: clientId,
      },
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #G = :g',
  };

  return dynamodb.updateItem(dbParams).promise();
};

module.exports = { createGiftService };
