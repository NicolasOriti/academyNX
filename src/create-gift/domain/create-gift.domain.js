const { CreateGiftInputValidation } = require('../schema/input/create-gift.input');
const { createGiftService } = require('../service/create-gift.service');

const createGiftDomain = async (eventPayload, eventMeta, rawEvent) => {
  const payload = JSON.parse(eventPayload.Message);

  new CreateGiftInputValidation(payload, eventMeta);

  const clientGift = await createGiftService(payload);

  return { body: clientGift };
};

module.exports = { createGiftDomain };
