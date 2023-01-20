const dynamo = require('ebased/service/storage/dynamo');

const { UpdateClientValidation } = require('../schema/input/client-update.input');
const { BirthUpdatedEvent } = require('../schema/event/birth-update.event');

const { updateClientService } = require('../service/update-client.service');

const { publishBirthUpdated } = require('../service/publish-birth-updated.service');

const { calculateAge } = require('../../helper/calculate-age.helper');

const updateClientDomain = async (commandPayload, commandMeta) => {
  new UpdateClientValidation(commandPayload, commandMeta);

  if (calculateAge(commandPayload.birth) < 18 || calculateAge(commandPayload.birth) > 65) {
    return {
      statusCode: 400,
      body: 'El cliente debe tener entre 18 y 65 años',
    };
  }

  const params = {
    name: commandPayload.name,
    lastName: commandPayload.lastName,
    birth: commandPayload.birth,
  };

  const { Item: client } = await dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.dni },
  });

  if (!client) {
    return {
      statusCode: 404,
      body: 'El Cliente no se encontro',
    };
  }

  const updatedProperties = await updateClientService(params, commandPayload.dni);

  if (client.birth != updatedProperties.birth) {
    console.log('*******************CAMBIO BIRTH');
    await publishBirthUpdated(
      new BirthUpdatedEvent({ dni: client.dni, ...updatedProperties }, commandMeta)
    );
  }

  return { body: updatedProperties };
};

module.exports = { updateClientDomain };
