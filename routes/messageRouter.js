// routes/messagerouter.js
const { Router } = require('express');
const {
  getMessages,
  newMessage,
  createMessage,
  getMessageDetails,
  update,
  updateForm,
  deleteM,
  searchUsers,
  validateMessage,
} = require('../controller/messageController.js');
const messageRouter = Router();

messageRouter.get('/', getMessages);
messageRouter.get('/new', newMessage);
messageRouter.post('/new', validateMessage, createMessage);
messageRouter.post('/update/:id', validateMessage, update);
messageRouter.get('/messages/:id/edit', updateForm);
messageRouter.get('/messages/:id', getMessageDetails);
messageRouter.post('/delete/:id', deleteM);
messageRouter.get('/search', searchUsers);

module.exports = messageRouter;
