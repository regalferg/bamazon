//Boilerplate
var mysql = require("mysql");
var inquirer = require("inquirer");
var temp = 0;
var price = 0;
var num = 0;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "service1",

    // Your password
    password: "Test123!!",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    start();
});
// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "welcome",
            type: "list",
            message: "Welcome to Bamazon, your one stop shop! We sell everything from Household Items to Rare Collectables! Please select SHOP to begin!",
            choices: ["SHOP", "EXIT"]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.welcome === "SHOP") {
                console.log("Time to Shop!");
                startShop();
            } else {
                console.log("Please Visit Us Again Soon!");
                process.exit();
            }
        });
}

//Start the Shop function, 1st option menu
function startShop() {
    inquirer
        .prompt([{
                name: "startmenu",
                type: "list",
                message: "Please select all Products or filter by Department to begin shopping: ",
                choices: ["Product", "Department", "EXIT"]
            }

        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            if (answer.startmenu === "Product") {
                byProduct();

            } else if (answer.startmenu === "Department") {

                byDepartment();
            } else {
                console.log("Please Visit Us Again Soon!");
                process.exit();
            }
        });

}

// Displays All Products in database
function byProduct() {
    console.log("Products Listed Below:");
    console.log("**********************");
    connection.query(
        "SELECT * FROM products;",

        function(err, rows, fields) {
            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {

                console.log(JSON.stringify(rows[i]));
                console.log("************************************");
            }
            purchaseItem();

        }
    );

}

// Filters Products by Dept
function byDepartment() {

    inquirer
        .prompt([{
                name: "deptmenu",
                type: "list",
                message: "Please select a Department to begin shopping: ",
                choices: ["Household Items", "Weapons", "Antiques", "EXIT"]
            }

        ]).then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            if (answer.deptmenu === "Household Items") {
                console.log("Products Listed Below:");
                console.log("**********************");
                connection.query(
                    "SELECT * FROM products WHERE department_name = 'Household Items';",

                    function(err, rows, fields) {
                        if (err) throw err;
                        for (var i = 0; i < rows.length; i++) {

                            console.log(JSON.stringify(rows[i]));
                            console.log("************************");
                        }
                        // console.log(JSON.stringify(rows));

                        // re-prompt the user for if they want to choose again
                        purchaseItem();
                    }
                );

            } else if (answer.deptmenu === "Weapons") {

                console.log("Products Listed Below:");
                console.log("**********************");
                connection.query(
                    "SELECT * FROM products WHERE department_name = 'Weapons';",

                    function(err, rows, fields) {
                        if (err) throw err;
                        for (var i = 0; i < rows.length; i++) {

                            console.log(JSON.stringify(rows[i]));
                            console.log("************************");
                        }
                        // console.log(JSON.stringify(rows));

                        // re-prompt the user for if they want to choose again
                        purchaseItem();
                    }
                );
            } else if (answer.deptmenu === "Antiques") {
                console.log("Products Listed Below:");
                console.log("**********************");
                connection.query(
                    "SELECT * FROM products WHERE department_name = 'Antiques';",

                    function(err, rows, fields) {
                        if (err) throw err;
                        for (var i = 0; i < rows.length; i++) {

                            console.log(JSON.stringify(rows[i]));
                            console.log("************************");
                        }
                        

                        // re-prompt the user for if they want to choose again
                        purchaseItem();
                    }
                );
            } else {
                console.log("Please Visit Us Again Soon!");
                process.exit();
            }

        });
}

// Purchase Menu. Selects quantity, displays if inventory is available and price of quantity selected.
function purchaseItem() {

    inquirer.prompt([{

        name: "item",
        type: "input",
        message: "Please select the id of the item you wish to purchase.",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }

    }]).then(function(answer) {

        connection.query(
            `SELECT * FROM products WHERE item_id = ${answer.item};`,
            function(err, rows, fields) {
                if (err) throw err;
                // num = answer.item;
                // console.log(num);
                temp = rows[0].stock_quantity;
                price = parseFloat(rows[0].price);
                console.log("You have selected to purchase a: " + JSON.stringify(rows[0].product_name) + "\n");

                // console.log(price);
            }
        );
        setTimeout(function() {
            inquirer.prompt([{

                name: "quantity",
                type: "input",
                message: "Please select the quantity of the items you wish to purchase.",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            }]).then(function(answers) {

                if (temp < answers.quantity) {
                    console.log("Insufficient quantity!")
                    purchaseItem();
                } else {
                    connection.query(
                        `UPDATE products SET stock_quantity = stock_quantity - ${answers.quantity}  WHERE item_id =${answer.item} ;`,

                        function(err, rows, fields) {
                            if (err) throw err;
                            // console.log(JSON.stringify(rows));
                            var temp2 = parseFloat(answers.quantity);

                            function calc(a, b) {
                                return a * b;
                            }

                            console.log("Your total is: $" + calc(price, temp2));


                        }
                    );
                    setTimeout(function() {
                        inquirer.prompt([{
                                name: "additionalpurchases",
                                type: "list",
                                message: "Would you like tp purchase another item? ",
                                choices: ["YES", "No"]
                            }

                        ]).then(function(result) {
                            if (result.additionalpurchases === "YES") {
                                startShop();
                            } else {
                                console.log("Please Visit Us Again Soon!");
                                process.exit();
                            }

                        })

                    }, 2000);


                }


            })

        }, 2000);


    })

}