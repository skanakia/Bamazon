DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10), 
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toaster", "Kitchen Appliances", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen Appliances", 69.95, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wool Coat", "Clothing", 29.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trousers", "Clothing", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens", "Office Supplies", 4.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stapler", "Office Supplies", 9.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canned Vegetables", "Food", 2.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Food", 3.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone X", "Electronics", 1099.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HD TV", "Electronics", 149.99, 7);