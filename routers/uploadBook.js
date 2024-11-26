const express = require("express");
const router = express.Router();
const conection = require("../dbConnection/db");
const createToken = require("../verificationJwt/createToken");
const verifyToken = require("../verificationJwt/verifyToken");

router.post('/uploadBook', (req, res) => {
    const {  bookTitle, authorName, category: category, imgUrl, bookPdfUrl, userId } = req.body;
    // console.log(id, bookTitle, authorName, cagtegory, bookPdfUrl, userId);
    if (userId) {
        conection.query(`select * from books where email='${userId}';`, () => {
            // console.log(`select * from books where email='${userId}';`, req.body.userId);
            if (0 > req.body.userId) {
                res.send("Not exist")
            }
            else {
                conection.query(`insert into books( bookTitle, authorName, category, imgUrl, bookPdfUrl, userId)values ( '${bookTitle}', '${authorName}', '${category}','${imgUrl}', '${bookPdfUrl}', '${userId}');`, (err, data) => {
                    // console.log({err,data});
                    if (!err) {
                        res.status(200).send("Successfully inserted books info.")
                    }
                    else {
                        console.log(err, `insert into books( bookTitle, authorName, category, imgUrl, bookPdfUrl, userId)values ( '${bookTitle}', '${authorName}', '${category}','${imgUrl}', '${bookPdfUrl}', '${userId}');`);// for validating error
                        res.send("Something went wrong")
                    }
                });
            }
        })
    }
    else {
        res.status(404).json({
            error:
                "wrong userID. Kindly check again."
        });
    }
});

router.get("/all-books/:category", (req, res) => {
    // Capture 'category' from the route parameters
    const { category: cagtegory } = req.params;
    console.log(req);

    // Check if the 'category' parameter exists
    if (cagtegory) {
        // Perform the query to fetch books based on category
        conection.query('SELECT * FROM books WHERE cagtegory = ?;', [cagtegory], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("An error occurred while fetching books.");
            }
            // Send the retrieved data to the client
            res.status(200).json({
                message: "Books fetched successfully.",
                data: data
            });
        });
    } else {
        // If no category is provided, return an error message
        res.status(400).send("Please provide a category.");
    }
});

router.get("/all-books/category/:category", (req, res) => {
    // Capture 'category' from the route parameters
    const { category } = req.params;
    console.log(category);

    // Check if the 'category' parameter exists
    if (category) {
        // Perform the query to fetch books based on category
        conection.query(`SELECT * FROM books WHERE category like ?;`, [`%${category}%`], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("An error occurred while fetching books.");
            }
            // Send the retrieved data to the client
            res.status(200).json({
                message: "Books fetched successfully.",
                data: data
            });
        });
    } else {
        // If no category is provided, return an error message
        res.status(400).send("Please provide a category.");
    }
});

router.get("/all-books", (req, res) => {
    // For a GET request, use req.query to capture query parameters if needed
    const { userId } = req.query;
    // console.log(userId);
    
    // Perform the query to fetch all books (userId is not needed for this query)
    // console.log(`SELECT * FROM books;`);
    conection.query(`SELECT * FROM books;`, (err, data) => {
        
        if (err) {
            // If an error occurs, send a 500 status code with an error message
            console.error(err);
            return res.status(500).send("An error occurred while fetching books.");
        }
        // If books are found, return them with a 200 status code
        res.status(200).json({
            message: "Books fetched successfully.",
            data: data
        });
    });
});

router.patch('/book/:id', (req, res) => {
    const id = req.params.id;
    // console.log(req.params.id);
    const { bookTitle, authorName,  category, imgUrl, bookPdfUrl } = req.body;

    // SQL query updated to include all the fields
    const query = `UPDATE books 
                   SET bookTitle = ?, authorName = ?, category = ?, imgUrl = ?, bookPdfUrl = ? 
                   WHERE id = ?;`;

    conection.query(query, [bookTitle, authorName, category, imgUrl, bookPdfUrl, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: err.message });
        }
        else {
            console.log(result);
            res.send({ message: 'Record updated successfully' });
        }
    })

});

router.delete('/book/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    
    // DELETE FROM table_name WHERE condition;
    conection.query(`delete from books where id=${id};`, (err, result) => {
        if (err) {
            // console.log(err);            
            res.status(500).send({ error: err.message });
        }
        else {
            console.log(result);
            res.send({ message: 'Record deleted successfully' });
        }
    });

});

router.get("/books/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    if (id) {
        conection.query(`SELECT * FROM books WHERE id=${id}`, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("An error occurred while fetching books.");
            }
            // Send the retrieved data to the client
            res.status(200).json({
                message: "Books fetched successfully.",
                data: data
            });
        });
    } else {
        // If no category is provided, return an error message
        res.status(400).send("Please provide a id.");
    }
});

module.exports = router;
