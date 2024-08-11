const mysql = require("mysql2/promise");
const data = require("./data.json").data; // Assuming your JSON is saved as data.json

console.log(data);

async function insertData() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecom",
  });

  try {
    await connection.beginTransaction();

    // Insert categories
    const categoryQueries = data.categories.map((category) => {
      return connection.execute("INSERT INTO categories (name) VALUES (?)", [
        category.name,
      ]);
    });
    await Promise.all(categoryQueries);

    // Insert products
    for (const product of data.products) {
      await connection.execute(
        "INSERT INTO products (id, name, in_stock, description, category_id, brand) VALUES (?, ?, ?, ?, (SELECT id FROM categories WHERE name = ?), ?)",
        [
          product.id,
          product.name,
          product.inStock,
          product.description,
          product.category,
          product.brand,
        ]
      );

      // Insert images
      const imageQueries = product.gallery.map((url) => {
        return connection.execute(
          "INSERT INTO images (product_id, url) VALUES (?, ?)",
          [product.id, url]
        );
      });
      await Promise.all(imageQueries);

      // Insert attributes
      for (const attributeSet of product.attributes) {
        const attributeQueries = attributeSet.items.map((item) => {
          return connection.execute(
            "INSERT INTO attributes (product_id, attribute_name, attribute_value, display_value) VALUES (?, ?, ?, ?)",
            [product.id, attributeSet.name, item.value, item.displayValue]
          );
        });
        await Promise.all(attributeQueries);
      }

      // Insert prices
      const priceQueries = product.prices.map((price) => {
        return connection.execute(
          "INSERT INTO prices (product_id, amount, currency) VALUES (?, ?, ?)",
          [product.id, price.amount, price.currency.label]
        );
      });
      await Promise.all(priceQueries);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Transaction failed:", error);
  } finally {
    await connection.end();
  }
}

insertData();
