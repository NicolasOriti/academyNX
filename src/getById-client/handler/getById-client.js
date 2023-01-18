const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const dynamoDb = new DocumentClient({
  region: 'us-east-1',
});

module.exports.handler = (event, context, callback) => {
  console.log('ESTE ES EL DNI:', event.pathParameters.id);
  const params = {
    TableName: process.env.CLIENTS_TABLE,
    Key: {
      dni: event.pathParameters.id,
    },
  };

  dynamoDb
    .get(params)
    .promise()
    .then((result) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch((error) => {
      console.error(error);
      callback(new Error('No se encuentra el cliente'));
      return;
    });
};
