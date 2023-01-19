const DYNAMODB = require('aws-sdk/clients/dynamodb');

const dynamodb = new DYNAMODB({
  region: 'us-east-1',
});

async function updatePoint(clientId, points) {
  const dbParams = {
    ExpressionAttributeNames: {
      '#P': 'points',
    },
    ExpressionAttributeValues: {
      ':points': {
        N: points.toString(),
      },
    },
    Key: {
      dni: {
        S: clientId,
      },
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #P = :points',
  };

  return dynamodb.updateItem(dbParams).promise();
}

module.exports = { updatePoint };
