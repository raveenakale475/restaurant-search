const express = require('express');
const cors = require('cors');
const dishRoutes = require('./routes/dishRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/search', dishRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Restaurant Search API',
    status: 'active',
    endpoints: {
      search: 'GET /search/dishes?name={dishName}&minPrice={min}&maxPrice={max}'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;