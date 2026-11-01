const express = require('express');
const usersRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/users', usersRoute);
app.use('/transactions', transactionsRoute);

module.exports = app;