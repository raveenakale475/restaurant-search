require('dotenv').config();
const app = require('./src/app');
const models = require('./src/models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await models.createTables();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();