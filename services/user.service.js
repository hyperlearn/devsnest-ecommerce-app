const { PrismaClient } = require('@prisma/client')
const md5 = require('md5');

const prisma = new PrismaClient()
const createUser = async (userDetails) => {
  await prisma.user.create(
    { data:
      {
        ...userDetails,
        password: md5(userDetails.password),
        role: 'USER'
      } 
    });
};

module.exports = {
  createUser
};
