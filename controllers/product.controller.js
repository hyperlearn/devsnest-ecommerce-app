const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createProduct = async (req, res) => {
  const { sellerId } = req.params;
  console.log("Initiating create seller");

  console.log('The files',req.files);
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
          name, price: parseInt(price), description, productImages,
          discountPrice: parseInt(discountPrice), 
          isDiscounted: isDiscounted === 'true', category, inStock: inStock === 'true',
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
  const { limit = 10, offset = 0, sortBy, 
  sortOrder, search} = req.query;
  console.log(`limit: ${limit} & offset: ${offset}`);
  try {
    // const resp = await prisma.product.findMany({
    //   skip: parseInt(offset),
    //   take: parseInt(limit),
    // }
    const query = {
      skip: parseInt(offset),
      take: parseInt(limit),
    }

    if (sortBy && sortOrder) {
      query['orderBy'] = {
        [sortBy]: sortOrder,
      }
    }
    if (search) {
      query['where'] = {
        description: {
          search: search
        }
      }
    }
    const resp = await prisma.product.findMany(query);


    res.status(200).json({ msg: "Success", data: resp});
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Bad request"});
  }
}

module.exports =  {
  createProduct, getProducts
};

// sql injection 

// const query = `select * from products
// limit ${limit}
// offset ${offset}
// order by ${sortBy} ${sortOrder}
// `
