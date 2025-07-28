const queries = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateMessage = [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Email is required and must be a valid email address'),
  body('age')
    .isNumeric()
    .isInt({ min: 18, max: 120 })
    .withMessage('Age must be a number and between 18 and 120'),
  body('bio')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Bio must be less than 200 characters'),
];

async function newMessage(req, res) {
  try {
    res.render('form', {
      title: 'New Message',
      errors: [],
      formData: {},
      formAction: '/new',
      submitLabel: 'Create Message',
    });
  } catch (error) {
    console.error('Error creating new message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function createMessage(req, res) {
  const errors = validationResult(req);
  const { text, user, email, age, bio } = req.body;

  if (!errors.isEmpty()) {
    return res.render('form', {
      title: 'New Message',
      errors: errors.array(),
      formData: { text, user, email, age, bio },
      formAction: '/new',
      submitLabel: 'Create Message',
    });
  }

  try {
    await queries.createMessage(text, user, email, age, bio);
    res.redirect('/');
  } catch (error) {
    console.error('Error saving new message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getMessages(req, res) {
  try {
    const messages = await queries.getAllMessages();
    res.render('index', {
      title: 'Mini Message Board',
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getMessageDetails(req, res) {
  try {
    const message = await queries.getMessageById(Number(req.params.id));
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.render('message-detail', { title: 'Message Details', message });
  } catch (error) {
    console.error('Error fetching message details:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function update(req, res) {
  const errors = validationResult(req);
  const { text, user, email, age, bio } = req.body;
  const { id } = req.params;
  if (!errors.isEmpty()) {
    return res.render('form', {
      title: 'Edit Message',
      errors: errors.array(),
      formData: { id, text, user, email, age, bio },
    });
  }

  try {
    const updatedMessage = await queries.updateMessage(
      Number(id),
      text,
      user,
      email,
      age,
      bio
    );
    if (!updatedMessage) {
      return res.status(404).send('Message not found');
    }
    res.redirect(`/messages/${id}`);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateForm(req, res) {
  try {
    const message = await queries.getMessageById(Number(req.params.id));
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.render('form', {
      title: 'Edit Message',
      errors: [],
      formData: message,
      formAction: `/update/${message.id}`,
      submitLabel: 'Update',
    });
  } catch (error) {
    console.error('Error fetching message for edit:', error);
    res.status(500).send('Internal Server Error');
  }
}
async function deleteM(req, res) {
  try {
    const { id } = req.params;
    const deleted = await queries.deleteMessage(Number(id));
    if (!deleted) {
      return res.status(404).send('Message not found');
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function searchUsers(req, res) {
  const query = req.query.q?.trim().toLowerCase();

  if (!query) {
    // No query provided — show search form
    return res.render('search', {
      title: 'Search',
      query: '',
    });
  }

  const user = await queries.searchMessage(query);
  res.render('search-result', {
    title: 'Search Result',
    user: user || null,
    query: req.query.q,
  });
}

module.exports = {
  getMessages,
  newMessage,
  createMessage,
  getMessageDetails,
  update,
  validateMessage,
  updateForm,
  deleteM,
  searchUsers,
};
