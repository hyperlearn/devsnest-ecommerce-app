const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createProduct = async (req, res) => {
  const { sellerId } = req.params;
  console.log("Initiating create seller")
  try {
    const { name, price, description, productImages = [], 
    discountPrice, isDiscounted, category, inStock
    } = req.body;

    await prisma.seller.update({
      where: {
        id: parseInt(sellerId)
      }
    , data: {
      products: {create: [
        {
          name, price, description, productImages,
          discountPrice, isDiscounted, category, inStock,
        }
      ]
    }}}
    );
    // await prisma.product.create({
    //   data: {
    //     name, price, description, productImages,
    //     discountPrice, isDiscounted, category, inStock, seller: parseInt(sellerId)
    //   }
    // });
    res.status(200).json({ msg: "Successfully Added product for seller " + sellerId});
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Bad request"});
  }
}
const getProducts =  async (req, res) => {
  try {
    const resp = await prisma.product.findMany({})
    res.status(200).json({ msg: "Success", data: resp});
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Bad request"});
  }
}

module.exports =  {
  createProduct, getProducts
};