const { CreateCardInputValidation } = require('../schema/input/create-card.input');
const { createAndAssign } = require('../service/create-card.service');

const createCardDomain = async (eventPayload, eventMeta, rawEvent) => {
  const payload = JSON.parse(eventPayload.Message);

  new CreateCardInputValidation(payload, eventMeta);

  const clientCard = await createAndAssign(payload);

  return { body: clientCard };
};

module.exports = { createCardDomain };
