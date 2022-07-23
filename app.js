const express = require('express');
const app = express();
const path = require("path")
const mainRouter = require('./routes/index');
const articleRouter = require('./routes/articles');

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.json());
app.use('/', mainRouter);
app.use('/article', articleRouter);


// port 3000
app.listen(3000)