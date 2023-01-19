const DYNAMODB = require('aws-sdk/clients/dynamodb');

const { calculateAge } = require('../../helper/calculate-age.helper');

const dynamodb = new DYNAMODB({
  region: 'us-east-1',
});

function randomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

const createAndAssign = async (client) => {
  const clientCard = create(client);
  console.info('Card created', clientCard);

  await save(client, clientCard);

  console.info('Persisted card');

  return clientCard;
};

function create(client) {
  const creditCardNumber = `${randomNumber(0000, 9999)}-${randomNumber(0000, 9999)}-${randomNumber(
    0000,
    9999
  )}-${randomNumber(0000, 9999)}`;
  const expirationDate = `${randomNumber(01, 12)}/${randomNumber(21, 35)}`;
  const securityCode = `${randomNumber(000, 999)}`;
  let type = calculateAge(client.birth) > 45 ? 'Gold' : 'Classic';

  return {
    type,
    securityCode,
    number: creditCardNumber,
    expirationDate,
  };
}

async function save(client, clientCard) {
  const dbParams = {
    ExpressionAttributeNames: {
      '#C': 'creditCard',
    },
    ExpressionAttributeValues: {
      ':c': {
        M: {
          number: {
            S: clientCard.number,
          },
          expiration: {
            S: clientCard.expirationDate,
          },
          ccv: {
            S: clientCard.securityCode,
          },
          type: {
            S: clientCard.type,
          },
        },
      },
    },
    Key: {
      dni: {
        S: client.dni,
      },
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #C = :c',
  };

  console.info(dbParams);

  return dynamodb.updateItem(dbParams).promise();
}

module.exports = { createAndAssign };
