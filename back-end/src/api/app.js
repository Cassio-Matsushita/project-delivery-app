const cors = require('cors');
const express = require('express');
const { userRouter, loginRouter, productRouter } = require('./routers');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());

app.use(userRouter);

app.use(loginRouter);

app.use(productRouter);

app.use(express.static('public'));
app.use(express.static('images'));

module.exports = app;
