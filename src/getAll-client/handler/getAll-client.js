const DYNAMODB = require('aws-sdk/clients/dynamodb');

const dynamoDb = new DYNAMODB({
  region: 'us-east-1',
});

module.exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.CLIENTS_TABLE,
  };

  console.log('Scanning Clients table.');
  const onScan = (err, data) => {
    if (err) {
      console.log(
        'Scan failed to load data. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      callback(err);
    } else {
      console.log('Scan succeeded.');
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          clients: data.Items,
        }),
      });
    }
  };

  dynamoDb.scan(params, onScan);
};
