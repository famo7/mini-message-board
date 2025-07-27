// routes/messagerouter.js
const { Router } = require('express');
const {
  getMessages,
  newMessage,
  createMessage,
  getMessageDetails,
} = require('../controller/messageController.js');
const messageRouter = Router();

messageRouter.get('/', getMessages);
messageRouter.get('/new', newMessage);
messageRouter.post('/new', createMessage);
messageRouter.get('/messages/:id', getMessageDetails);
module.exports = messageRouter;
