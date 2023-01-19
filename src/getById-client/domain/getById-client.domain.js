const { getByIdClientService } = require('../service/getById-client.service');

const getByIdClientDomain = async (commandPayload, commandMeta) => {
  const client = await getByIdClientService(commandPayload.id);

  if (!client || client.enable === false) {
    return {
      statusCode: 404,
      body: 'No se encontro el cliente',
    };
  }

  return { body: client };
};

module.exports = {
  getByIdClientDomain,
};
