const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { getByIdClientDomain } = require('../domain/getById-client.domain');

module.exports.handler = async (command, context) => {
  return commandMapper({ command, context }, inputMode, getByIdClientDomain, outputMode);
};
