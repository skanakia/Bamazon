var inquirer = require("inquirer");
var mysql = require("mysql");

var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        type: "rawlist",
        message: "What action would you like to take?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
    }).then(answer => {
        switch (answer.action) {
            case "View Products for Sale":
                inventory();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                console.log("Error: Not a valid chioce");
                start();
        }
    });
}

function inventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Available Inventory")
        console.log(res);
        start();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log("Available Inventory")
        console.log(res);
        start();
    });
}

function addInventory() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            message: "Which item would you like to restock?",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            name: "item"
        }, {
            type: "input",
            message: "How much of this product would you like to add?",
            name: "quantity"
        }]).then(answers => {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?", [
                answers.quantity, 
            {
                product_name: answers.item
            }], function (err, res) {
                if (err) throw err;
                console.log("Inventory Updated: Added " + answers.quantity + " units to " + answers.item);
                start();
            });
        });
    });
}

function addProduct() {


    inquirer.prompt([{
        type: "input",
        message: "Which item would you like to add?",
        name: "item"
    }, {
        type: "input",
        message: "How much of this product would you like to add?",
        name: "quantity"
    }, {
        type: "input",
        message: "What department would you classify this item under?",
        name: "department"
    }, {
        type: "input",
        message: "What is the price of this item?",
        name: "price"
    }]).then(answers2 => {
        connection.query("INSERT INTO products SET ?",
        {
          product_name: answers2.item,
          department_name: answers2.department,
          price: answers2.price,
          stock_quantity: answers2.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was successfully added!");
          start();
        });
    });
}