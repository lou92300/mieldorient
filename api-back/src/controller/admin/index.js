import pool from "../../config/database.js";

const getStats = async (req, res) => {
  try {
    const queryTotalUsers = `
            SELECT COUNT(*) AS total_users 
            FROM user;
        `;
    const [totalUsersResult] = await pool.query(queryTotalUsers);
    const totalUsers = totalUsersResult[0].total_users;

    const queryUser = `
            SELECT u.username, 
                   u.firstname,
                   u.email,
                   a.country,
                   a.city,
                   a.zipcode,
                   a.number,
                   a.street
            FROM user u
            LEFT JOIN address a ON u.id = a.user_id;
        `;

    const [userData] = await pool.query(queryUser);

    const queryCategory = `
            SELECT * FROM category;
        `;
    const [categoryData] = await pool.query(queryCategory);

    const queryProduct = `
            SELECT name, price, stock, category_id
            FROM product;
        `;
    const [productData] = await pool.query(queryProduct);

    res.json({
      totalUsers,
      users: userData,
      categories: categoryData,
      products: productData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error:
          "Une erreur s'est produite lors de la récupération des statistiques.",
      });
  }
};

export { getStats };
