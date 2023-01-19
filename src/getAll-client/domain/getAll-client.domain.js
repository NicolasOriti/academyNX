const { getAllClientService } = require('../service/getAll-client.service');

const getAllClientDomain = async (commandPayload, commandMeta) => {
  const clients = await getAllClientService();
  console.log('ESTOS SON LOS CLIENTS:', clients);

  return { body: clients.filter((client) => client.enable === true) };
};

module.exports = {
  getAllClientDomain,
};
