const dynamo = require('ebased/service/storage/dynamo');

const { DeleteClientValidation } = require('../schema/input/delete-client.input');

const { deleteClientService } = require('../service/delete-client.service');

const deleteClientDomain = async (commandPayload, commandMeta) => {
  console.log('***********************', commandPayload, commandMeta);
  new DeleteClientValidation(commandPayload, commandMeta);

  console.info('Se valido bien el input');

  const { Item: client } = await dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.id },
  });

  console.log('********ESTE ES CLIENT', client);

  if (!client || client.enable === false) {
    return { status: 400, body: 'No se encontro el cliente' };
  }

  await deleteClientService(client.dni);

  return { body: 'Se borro con exito' };
};

module.exports = {
  deleteClientDomain,
};
