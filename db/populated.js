require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  "user" VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  age INTEGER,
  bio TEXT,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, "user", email, age, bio) 
VALUES
  ('Hi there!', 'Amando', 'test@gmail.com', 20, 'I am a software developer with a passion for coding and technology.'),
  ('Hello World!', 'Charles', 'test2@gmail.com', 21, ''),
  ('Good morning!', 'Damon', 'damon@example.com', 25, 'Love hiking and outdoor adventures.');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
