const messages = [
  {
    id: 1,
    text: 'Hi there!',
    user: 'Amando',
    email: 'test@gmail.com',
    age: 20,
    bio: 'I am a software developer with a passion for coding and technology.',
    added: new Date(),
  },
  {
    id: 2,
    text: 'Hello World!',
    email: 'test2@gmail.com',
    age: 21,
    bio: '',
    user: 'Charles',
    added: new Date(),
  },
];

let nextId =
  messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;

function getAllMessages() {
  return messages;
}

function getMessageById(id) {
  return messages.find((msg) => msg.id === id);
}

function addMessage(text, user, email, age, bio) {
  const newMessage = {
    id: nextId++,
    text,
    user,
    email,
    age,
    bio,
    added: new Date(),
  };
  messages.push(newMessage);
  return newMessage;
}

function updateMessage(id, newText, newUser, newEmail, newAge, newBio) {
  const messageIndex = messages.findIndex((msg) => msg.id === id);
  if (messageIndex !== -1) {
    messages[messageIndex].text = newText;
    messages[messageIndex].user = newUser;
    messages[messageIndex].email = newEmail;
    messages[messageIndex].age = newAge;
    messages[messageIndex].bio = newBio;
    return messages[messageIndex];
  }
  return undefined;
}

function deleteMessage(id) {
  const initialLength = messages.length;
  const filteredMessages = messages.filter((msg) => msg.id !== id);
  if (filteredMessages.length < initialLength) {
    messages.splice(0, messages.length, ...filteredMessages);
    return true;
  }
  return false;
}

module.exports = {
  getAllMessages,
  getMessageById,
  addMessage,
  updateMessage,
  deleteMessage,
};
