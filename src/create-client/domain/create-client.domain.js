const { createClientService } = require('../service/create-client.service');
const {
  publishClientCreated,
} = require('../service/publish-client-created.service');

const {
  CreateClientValidation,
} = require('../schema/input/create-client.input');
const { ClientCreatedEvent } = require('../schema/event/client-created.event');

const { calculateAge } = require('../helper/calculate-age.helper');

const createClientDomain = async (commandPayload, commandMeta) => {
  new CreateClientValidation(commandPayload, commandMeta);

  if (
    calculateAge(commandPayload.birth) < 18 ||
    calculateAge(commandPayload.birth) > 65
  ) {
    return {
      statusCode: 400,
      body: 'El cliente debe tener entre 18 y 65 años',
    };
  }

  await createClientService(commandPayload);
  await publishClientCreated(
    new ClientCreatedEvent(commandPayload, commandMeta)
  );

  return {
    statusCode: 200,
    body: 'Client added succesfully',
  };
};

module.exports = { createClientDomain };
