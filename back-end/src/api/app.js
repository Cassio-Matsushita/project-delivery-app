const cors = require('cors');
const express = require('express');
const router = require('./routers');
const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(cors());

app.use(router.userRouter);

module.exports = app;
