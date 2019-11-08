const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "bamazon_db"
    }
);

connection.connect(function (err) {

    if (err)
        throw err;

    console.log(`Connected as id ${connection.threadId}`);

    // displayProducts();
    productType();

})

// function displayProducts() {

//     let sqlQuery = `
//         SELECT item_id as ID, 
//         product_name as Name, 
//         department_name as Department, 
//         price as Price 
//         FROM products`;

//     connection.query(sqlQuery, function (err, results) {

//         if (err) throw err;

//         console.table(
//             results.reduce((acc, { ID, ...x }) => { acc[ID] = x; return acc }, {}),
//             ["Name", "Department", "Price"]
//         );

//     })
// };

function productType() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Which type of product are you interested in purchasing?",
                choices: ["Books", "Movies", "See all products"],
                name: "department"
            }
        )
        .then(function (userInput) {

            let sqlQueryAll = `
            SELECT item_id as ID, 
            product_name as Name, 
            department_name as Department, 
            price as Price 
            FROM products`;

            let sqlQueryDept = `
            SELECT item_id as ID, 
            product_name as Name, 
            department_name as Department, 
            price as Price 
            FROM products
            WHERE ?`;

            let where =
                [{
                    department_name: `${userInput.department}`
                }];

            if (userInput.department === "See all products") {

                connection.query(sqlQueryAll, where, function (err, results) {

                    if (err) throw err;

                    console.table(
                        results.reduce((acc, { ID, ...x }) => { acc[ID] = x; return acc }, {}),
                        ["Name", "Department", "Price"]
                    );

                })

            } else {

                connection.query(sqlQueryDept, function (err, results) {

                    if (err) throw err;

                    console.table(
                        results.reduce((acc, { ID, ...x }) => { acc[ID] = x; return acc }, {}),
                        ["Name", "Department", "Price"]
                    );

                })

            }
        });
}
