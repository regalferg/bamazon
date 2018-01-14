

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Blender","Household Items", 25.50, 100);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Bastard Sword","Weapons", 799.00, 12);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Ming Vase","Antiques", 5000.25, 4);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Cutting Board","Household Items", 19.99, 100);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Longword","Weapons", 500.00, 120);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Dragon Mask","Antiques", 2500.25, 5);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("potholder","Household Items", 15.50, 100);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Cutlass","Weapons", 250.25, 120);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Ancient Coin","Antiques", 300.25, 25);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("measuring cups","Household Items", 12.50, 100);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Scimitar","Weapons", 300.10, 120);

INSERT INTO products (product_name,department_name, price, stock_quantity)
VALUES ("Dinosaur Dung","Antiques", 2000.25, 75);
