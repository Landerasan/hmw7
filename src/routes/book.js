const express = require('express');
const ejs = require('ejs');

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController')
const fileMulter = require('../middleware/file')
const router = express.Router();


router.get('/view', (req, res) => {
    res.render('index', { books: bookController.returnBookList() });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/update', (req, res) => {
    res.render('update');
});

router.get('/view/:id', (req, res) => {
    res.render('index', { books: [bookController.findBook(req.params.id)] });
});

module.exports = router;