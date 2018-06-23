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
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Items for Sale");
        console.log(res);
        console.log("___________________________________");
        purchase();
    });
});

function purchase() {
    inquirer.prompt([{
        type: "input",
        message: "Which item ID of the product you would like to purchase?",
        name: "ID"
    }, {
        type: "input",
        message: "What quantity of this item would you like?",
        name: "quantity"
    }]).then(answers => {
        connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: answers.ID }, function (err, res) {
            if (err) throw err;
            console.log(res[0].stock_quantity)
            if (parseInt(answers.quantity) < res[0].stock_quantity) {
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: (res[0].stock_quantity - answers.quantity)
                }, {
                    item_id: answers.ID
                }], function (err, res) {
                    if (err) throw err;
                    console.log("Processing Order...")
                });

                connection.query("SELECT price FROM products WHERE ?", { item_id: answers.ID }, function (err, res) {
                    if (err) throw err;
                    var total = parseFloat(answers.quantity * res[0].price * 1.1);
                    var totRound = total.toFixed(2);
                    console.log("Your total is $" + totRound + " including a 10% tax");
                    restart();
                })
            } else {
                console.log("Insufficient Quantity!!! Transaction cancelled.");
                restart();
            }
        });
    });
}

function restart() {
    inquirer.prompt({
        type: "list",
        message: "Would you like to make another transaction?",
        choices: ["Yes", "No"],
        name: "restart"
    }).then(answer => {
        if (answer.restart == "Yes") {
            purchase();
        } else {
            connection.end();
        }
    });
}


