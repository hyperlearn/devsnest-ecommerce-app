const AWS = require('aws-sdk');
const { awsAccessKeyId, awsSecretAccessKey, awsRegion } = require('../config');

const sqs = new AWS.SQS({
  accessKeyId: 'test',// awsAccessKeyId,
  secretAccessKey: 'test', // awsSecretAccessKey,
  region: awsRegion,
  apiVersion: '2012-11-05',
});

const queueUrl = 'http://localhost:4566/000000000000/sample-queue'; //"https://sqs.ap-south-1.amazonaws.com/083378476485/devsnest_edu.fifo";

const produceMessage = async (message) => {
  const info = await sqs.sendMessage({
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl
  })
  console.log(info);
  console.log("Message successfully sent to queue");
}
console.log('region', awsRegion);
// listener
sqs.receiveMessage({ QueueUrl: queueUrl}, (err, data) => {
  console.log('listenignqueue', data);
  if (err) {
    console.log(err);
    console.log("Something Failed in SQS Listener");
  } else if (data.Messages) {
    console.log('From Queue');
    console.log(data.Messages);
  }
})

module.exports = { produceMessage };