const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const SNS = require('aws-sdk/clients/sns');

const sns = new SNS({
  region: 'us-east-1',
});

const dynamodb = new DocumentClient({
  region: 'us-east-1',
});

function calculateAge(birthday) {
  const birthDate = new Date(birthday); // birthday is a string in format YYYYMMDD
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { id } = event.pathParameters;

  if (calculateAge(body.birth) > 65) {
    return {
      statusCode: 400,
      body: 'Client must be under 65 years old',
    };
  }

  const dbParams = {
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'set'
  };

  const snsParams = {
    Message: JSON.stringify(body),
    TopicArn: process.env.CLIENTS_CREATED_TOPIC,
  };

  try {
    const dbResult = await dynamodb.update(dbParams).promise();
    console.info(dbResult);
    const snsResult = await sns.publish(snsParams).promise();
    console.info(snsResult);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error,
    };
  }

  return {
    statusCode: 200,
    body: 'Client added succesfully',
  };
};
