const { PrismaClient } = require('@prisma/client')
const { logger } = require('../logger');
const prisma = new PrismaClient()

const createSeller = async (req, res) => {
  logger.info("Initiating create seller")
  logger.info(req.body);
  try {
    const { name, email, gstNumber, phoneNumber } = req.body;
    await prisma.seller.create({
      data: {
        name, email, gstNumber, phoneNumber 
      }
    });
    res.status(200).json({ msg: "Successfully Added seller!"});
  } catch (err) {
    logger.error(err);
    res.status(400).json({ msg: "Bad request"});
  }
}
const getSellers =  async (req, res) => {
  try {
    if (req.query.search) {
      console.log(req.query);
      console.log('***');
      console.log(req.query.a.b.c);
      // add search condition
    }

    const resp = await prisma.seller.findMany({})
    res.status(200).json({ msg: "Success", data: resp});
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Bad request"});
  }
}

module.exports =  {
  createSeller, getSellers
};