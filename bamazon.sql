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

CREATE TABLE departments (
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(45),
    over_head_costs DECIMAL(10,2),
    product_sales DECIMAL(10,2),
    PRIMARY KEY (department_id) 
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




INSERT INTO departments ( department_name, over_head_costs, product_sales)
VALUES ("Kitchen Appliances", 5000.00, 5000.00);

INSERT INTO departments ( department_name, over_head_costs, product_sales)
VALUES ("Clothing", 3000.00, 4000.00);

INSERT INTO departments ( department_name, over_head_costs, product_sales)
VALUES ("Office Supplies", 2000.00, 1000.00);

INSERT INTO departments ( department_name, over_head_costs, product_sales)
VALUES ("Food", 1500.00, 2000.00);

INSERT INTO departments ( department_name, over_head_costs, product_sales)
VALUES ("Electronics", 8500.00, 8000.00);