const express = require('express');
const app = express();
const port = 3000;
const path = require('node:path');
const expressLayouts = require('express-ejs-layouts');
const { messages } = require('./db.js');
const messageRouter = require('./routes/messageRouter.js');
const messageController = require('./controller/messageController.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', messageRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
