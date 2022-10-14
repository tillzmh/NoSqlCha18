const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('./routes/index'));

mongoose.connect(process.env.MANGODB_URL || 'mongodb://localhost/nosql-cha-18', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));