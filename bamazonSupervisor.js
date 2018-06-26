var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');


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
        choices: ["View Products Sales by Department", "Create New Department"],
        name: "action"
    }).then(answer => {
        switch (answer.action) {
            case "View Products Sales by Department":
                viewDep();
                break;
            case "Create New Department":
                createDep();
                break;
            default:
                console.log("Error: Not a valid chioce");
                start();
        }
    });
}

function viewDep() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']
            , colWidths: [15, 20, 18, 15, 15]
        });
        for (var i = 0; i < res.length; i++) {
            var profit = res[i].product_sales - res[i].over_head_costs;
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, profit]);
        }
        console.log(table.toString());
        start();
    });
}

function createDep() {
    inquirer.prompt([{
        type: "input",
        message: "What department would you like to add?",
        name: "department"
    }, {
        type: "input",
        message: "What are the overhead costs of this department?",
        name: "overhead"
    }]).then(answers => {
        connection.query("INSERT INTO departments SET ?",
            {
                department_name: answers.department,
                over_head_costs: answers.overhead,
                product_sales: 0
            },
            function (err) {
                if (err) throw err;
                console.log("Your department was successfully created!");
            });
        start()
    });
}
