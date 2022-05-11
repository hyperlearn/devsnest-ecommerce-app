const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createSeller = async (req, res) => {
  console.log("Initiating create seller")
  try {
    const { name, email, gstNumber, phoneNumber } = req.body;
    await prisma.seller.create({
      data: {
        name, email, gstNumber, phoneNumber 
      }
    });
    res.status(200).json({ msg: "Successfully Added seller!"});
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Bad request"});
  }
}
const getSellers =  async (req, res) => {
  try {
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