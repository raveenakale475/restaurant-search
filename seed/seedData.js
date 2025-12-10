require('dotenv').config();
const pool = require('./../src/config/database');
const models = require('./../src/models');

const seedData = async () => {
  const connection = await pool.getConnection();
  
  try {
    console.log('Starting database seeding...');
    
    await models.createTables();
    
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE orders');
    await connection.query('TRUNCATE TABLE menu_items');
    await connection.query('TRUNCATE TABLE restaurants');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    const restaurants = [
      ['Hyderabadi Spice House', 'Hyderabad', 'Jubilee Hills, Hyderabad'],
      ['Paradise Biryani', 'Hyderabad', 'Secunderabad, Hyderabad'],
      ['Bawarchi Restaurant', 'Hyderabad', 'RTC X Roads, Hyderabad'],
      ['Mumbai Masala Kitchen', 'Mumbai', 'Bandra West, Mumbai'],
      ['Delhi Darbar', 'Delhi', 'Connaught Place, Delhi'],
      ['Kolkata Biryani House', 'Kolkata', 'Park Street, Kolkata'],
      ['Chennai Spice Garden', 'Chennai', 'T Nagar, Chennai'],
      ['Bangalore Biriyani Zone', 'Bangalore', 'Koramangala, Bangalore'],
      ['Lucknow Nawab', 'Lucknow', 'Hazratganj, Lucknow'],
      ['Pune Food Plaza', 'Pune', 'FC Road, Pune'],
      ['Taste of India', 'Hyderabad', 'Banjara Hills, Hyderabad'],
      ['Royal Kitchen', 'Mumbai', 'Andheri East, Mumbai'],
      ['Spice Route', 'Delhi', 'Karol Bagh, Delhi'],
      ['Flavors of South', 'Chennai', 'Anna Nagar, Chennai'],
      ['Biryani Express', 'Bangalore', 'Indiranagar, Bangalore']
    ];

    for (const restaurant of restaurants) {
      await connection.query(
        'INSERT INTO restaurants (name, city, address) VALUES (?, ?, ?)',
        restaurant
      );
    }
    console.log('Restaurants inserted');

    const menuItems = [
      [1, 'Chicken Biryani', 220, 'Main Course'],
      [1, 'Mutton Biryani', 280, 'Main Course'],
      [1, 'Paneer Tikka', 180, 'Starter'],
      [2, 'Chicken Biryani', 250, 'Main Course'],
      [2, 'Veg Biryani', 150, 'Main Course'],
      [2, 'Chicken 65', 200, 'Starter'],
      [3, 'Chicken Biryani', 200, 'Main Course'],
      [3, 'Fish Curry', 280, 'Main Course'],
      [3, 'Paneer Butter Masala', 190, 'Main Course'],
      [4, 'Chicken Biryani', 260, 'Main Course'],
      [4, 'Butter Chicken', 240, 'Main Course'],
      [4, 'Paneer Tikka', 170, 'Starter'],
      [5, 'Chicken Biryani', 230, 'Main Course'],
      [5, 'Mutton Korma', 300, 'Main Course'],
      [5, 'Tandoori Chicken', 250, 'Main Course'],
      [6, 'Chicken Biryani', 190, 'Main Course'],
      [6, 'Prawn Malai Curry', 320, 'Main Course'],
      [6, 'Paneer Tikka', 160, 'Starter'],
      [7, 'Chicken Biryani', 210, 'Main Course'],
      [7, 'Fish Fry', 200, 'Starter'],
      [7, 'Veg Biryani', 140, 'Main Course'],
      [8, 'Chicken Biryani', 240, 'Main Course'],
      [8, 'Mutton Biryani', 290, 'Main Course'],
      [8, 'Paneer Butter Masala', 180, 'Main Course'],
      [9, 'Chicken Biryani', 270, 'Main Course'],
      [9, 'Lucknowi Kebab', 250, 'Starter'],
      [9, 'Paneer Tikka', 175, 'Starter'],
      [10, 'Chicken Biryani', 200, 'Main Course'],
      [10, 'Veg Biryani', 130, 'Main Course'],
      [10, 'Chicken Tikka', 220, 'Starter'],
      [11, 'Chicken Biryani', 235, 'Main Course'],
      [11, 'Paneer Tikka', 165, 'Starter'],
      [12, 'Chicken Biryani', 255, 'Main Course'],
      [12, 'Butter Chicken', 230, 'Main Course'],
      [13, 'Chicken Biryani', 225, 'Main Course'],
      [13, 'Mutton Biryani', 295, 'Main Course'],
      [14, 'Chicken Biryani', 215, 'Main Course'],
      [14, 'Fish Curry', 260, 'Main Course'],
      [15, 'Chicken Biryani', 245, 'Main Course'],
      [15, 'Paneer Tikka', 155, 'Starter']
    ];

    for (const item of menuItems) {
      await connection.query(
        'INSERT INTO menu_items (restaurant_id, dish_name, price, category) VALUES (?, ?, ?, ?)',
        item
      );
    }
    console.log('Menu items inserted');

    const orderCounts = {
      1: 96, 4: 85, 7: 78, 10: 72, 13: 68,
      16: 65, 19: 60, 22: 58, 25: 55, 28: 52,
      31: 50, 33: 48, 35: 45, 37: 42, 39: 40
    };

    const customerNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rohan', 'Kavya'];
    
    for (const [menuItemId, count] of Object.entries(orderCounts)) {
      for (let i = 0; i < count; i++) {
        const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
        await connection.query(
          'INSERT INTO orders (menu_item_id, customer_name) VALUES (?, ?)',
          [menuItemId, customerName]
        );
      }
    }

    for (let menuItemId = 2; menuItemId <= 40; menuItemId++) {
      if (!orderCounts[menuItemId]) {
        const orderCount = Math.floor(Math.random() * 30) + 5;
        for (let i = 0; i < orderCount; i++) {
          const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
          await connection.query(
            'INSERT INTO orders (menu_item_id, customer_name) VALUES (?, ?)',
            [menuItemId, customerName]
          );
        }
      }
    }

    console.log('Orders inserted');
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
};

seedData();