const { awsAccessKeyId, awsSecretAccessKey, awsRegion } = require('../config');
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const { sendEmail } = require('../services/email.service');


const sqs = new AWS.SQS({
  accessKeyId:  awsAccessKeyId,
  secretAccessKey:  awsSecretAccessKey,
  region: awsRegion,
  apiVersion: '2012-11-05',
  s3ForcePathStyle: true,
  endpoint: 'http://localhost:4566', // localstack
});

const queueUrl = "http://localhost:4566/000000000000/devsnest-queue"; //"https://sqs.ap-south-1.amazonaws.com/083378476485/devsnest_edu.fifo";

const produceMessage = async (message) => {
  console.log('messageto send', message )
  const info = await sqs.sendMessage({
    MessageBody: message,
    QueueUrl: queueUrl
  })
  // console.log(info);
  console.log("Message successfully sent to queue");
}

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (message) => {
    console.log(message)
    const { event, type, data} = JSON.parse(message.Body);
    console.log(event, type, data);
    if ( event === 'EMAIL' && type === 'WELCOME_EMAIL') {
      const { email } = data;
      await sendEmail({
        to: email,
        subject: "Welcome to devsnest ecommerce-app",
        text: "welcome",
        html: '<h1> Welcome! </h1>'
      })
    }
  },
  sqs: sqs
});

consumer.on('error', (err) => {
  console.error(err.message);
});

consumer.on('processing_error', (err) => {
  console.error(err.message);
});

consumer.start();

module.exports = { produceMessage };