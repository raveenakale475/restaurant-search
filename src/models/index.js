const pool = require('./../config/database');

const createTables = async () => {
  const connection = await pool.getConnection();
  
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        dish_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
        INDEX idx_dish_name (dish_name),
        INDEX idx_price (price)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        menu_item_id INT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        customer_name VARCHAR(255),
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
        INDEX idx_menu_item (menu_item_id)
      )
    `);

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { createTables };