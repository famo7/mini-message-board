const { messages } = require('../db.js');

async function getMessages(req, res) {
  try {
    res.render('index', { title: 'Mini Message Board', messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function newMessage(req, res) {
  try {
    res.render('form', { title: 'New Message' });
  } catch (error) {
    console.error('Error creating new message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function createMessage(req, res) {
  try {
    const { text, user } = req.body;
    if (!text || !user) {
      return res.status(400).send('Name and message are required');
    }
    messages.push({ text, user, added: new Date() });
    res.redirect('/');
  } catch (error) {
    console.error('Error saving new message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getMessageDetails(req, res) {
  try {
    const messageId = req.params.id;
    const message = messages[messageId];
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.render('message-detail', { title: 'Message Details', message });
  } catch (error) {
    console.error('Error fetching message details:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getMessages, newMessage, createMessage, getMessageDetails };
