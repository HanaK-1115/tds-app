const express = require('express');
const cors = require('cors');
const exampleRoutes = require('./routes/exampleRoutes');
const errorRoutes = require('./routes/errorRoutes');
const corsConfig = require('./middleware/corsConfig');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// Routes
app.use('/api/examples', exampleRoutes);
app.use('/api/log-error', errorRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = app;