CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    description TEXT,
    category_id INT,
    brand VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    attribute_name VARCHAR(255),
    attribute_value TEXT,
    display_value VARCHAR(255),  -- Adding display_value field
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    amount DECIMAL(10, 2),
    currency VARCHAR(10),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    attributes JSON,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);