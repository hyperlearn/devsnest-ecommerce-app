const { PrismaClient } = require('@prisma/client')
const rzp  = require('../services/razorpay.service');

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
  let rzpOrder;
  try {
    rzpOrder = await rzp.orders.create({
      amount: total,// Rs 100, 10000
      currency: 'INR',
      receipt: order.id,
    })
  } catch (error) {
    console.log(error);
  }

  console.log(rzpOrder, 'rzp')
  const { id: rzpId, amount, receipt } = rzpOrder;
  res.status(200).json({ status: 'Success', rzpId, amount, receipt,
  msg: 'Order Successfully created'});
};

module.exports = {
  createOrder
};