CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(250) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (5,2) NOT NULL,
stock_quantity INTEGER NULL,
PRIMARY KEY (item_id)
);