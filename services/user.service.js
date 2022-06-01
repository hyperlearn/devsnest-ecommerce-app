const { PrismaClient } = require('@prisma/client')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { authSecret } = require('../config');

const prisma = new PrismaClient()

const generateToken = async (name, email, role) => {
  const token = await jwt.sign({name, email, role}, authSecret, { expiresIn: '24h' });
  return token;
}
const createUser = async (userDetails) => {
  await prisma.user.create(
    { data:
      {
        ...userDetails,
        password: md5(userDetails.password),
        role: 'USER'
      } 
    });
  const token = await generateToken(userDetails.name, userDetails.email, 'USER');
  return token;
};

const validateUsernamePassword = async (email, password) => {
  const record = await prisma.user.findFirst({ where: { email }});
  const token = record ? await generateToken(record.name, record.email, record.role): null;
  return { resp: (record && record.password) === md5(password), token } ;
}
module.exports = {
  createUser,
  validateUsernamePassword
};
