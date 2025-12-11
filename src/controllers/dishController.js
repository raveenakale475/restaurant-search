const pool = require('./../config/database');

const searchDishesByName = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    if (!name || !minPrice || !maxPrice) {
      return res.status(400).json({
        error: 'Missing required parameters: name, minPrice, and maxPrice are mandatory'
      });
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (isNaN(min) || isNaN(max)) {
      return res.status(400).json({
        error: 'minPrice and maxPrice must be valid numbers'
      });
    }

    if (min > max) {
      return res.status(400).json({
        error: 'minPrice cannot be greater than maxPrice'
      });
    }

    const query = `
      SELECT 
        r.id AS restaurantId,
        r.name AS restaurantName,
        r.city,
        m.dish_name AS dishName,
        m.price AS dishPrice,
        COUNT(o.id) AS orderCount
      FROM restaurants r
      INNER JOIN menu_items m ON r.id = m.restaurant_id
      INNER JOIN orders o ON m.id = o.menu_item_id
      WHERE LOWER(m.dish_name) LIKE LOWER(?)
        AND m.price BETWEEN ? AND ?
      GROUP BY r.id, m.id
      ORDER BY orderCount DESC
      LIMIT 10
    `;

    const [results] = await pool.query(query, [`%${name}%`, min, max]);

    res.json({
      restaurants: results,
      summary: {
        count: results.length,
        filters: {
          dishName: name,
          minPrice: min,
          maxPrice: max
        }
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = { searchDishesByName };