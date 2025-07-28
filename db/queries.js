const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

const getMessageById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    id,
  ]);
  return rows[0];
};

const updateMessage = async (id, text, user, email, age, bio) => {
  const { rowCount } = await pool.query(
    'UPDATE messages SET text = $1, "user" = $2, email = $3, age = $4, bio = $5 WHERE id = $6',
    [text, user, email, age, bio, id]
  );
  return rowCount > 0;
};

const deleteMessage = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM messages WHERE id = $1', [
    id,
  ]);
  return rowCount > 0;
};

const createMessage = async (text, user, email, age, bio) => {
  const { rows } = await pool.query(
    'INSERT INTO messages (text, "user", email, age, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [text, user, email, age, bio]
  );
  return rows[0];
};

async function searchMessage(search = '') {
  const query = search.trim();

  if (query) {
    const { rows } = await pool.query(
      'SELECT * FROM messages WHERE "user" ILIKE $1 OR email ILIKE $1 LIMIT 1',
      [`%${query}%`]
    );
    return rows[0];
  }

  return null;
}

module.exports = {
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  createMessage,
  searchMessage,
};
