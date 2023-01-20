const DYNAMODB = require('aws-sdk/clients/dynamodb');

const dynamodb = new DYNAMODB({
  region: 'us-east-1',
});
const deleteClientService = async (clientId) => {
  const dbParams = {
    ExpressionAttributeNames: {
      '#E': 'enable',
    },
    ExpressionAttributeValues: {
      ':enable': {
        BOOL: false,
      },
    },
    Key: {
      dni: {
        S: clientId,
      },
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #E = :enable',
  };
  return dynamodb.updateItem(dbParams).promise();
};

module.exports = { deleteClientService };
