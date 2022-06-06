const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createOrder = async (req, res) => {
  console.log('Creating new order for user id ', req.body.userId);

  const { productIds, userId } = req.body;

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    }
  });

  const total = products.reduce((acc, x) => {
    if (x.isDiscounted) {
      acc = acc+x.discountPrice;
    } else {
      acc = acc+x.price
    }
   
 
    return acc;
  }, 0);

  const order = await prisma.order.create({
    data: {
      productIds, userId, total 
    }
  });
  console.log(order);
  res.status(200).json({ status: 'Success', 
  msg: 'Order Successfully created'});
};

module.exports = {
  createOrder
};