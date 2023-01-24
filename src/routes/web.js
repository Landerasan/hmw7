const express = require('express');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController')
const fileMulter = require('../middleware/file')
const router = express.Router();

router.get('/books', bookController.get);

router.get('/books/:id', bookController.getById);

router.get('/books/:id/download', bookController.downloadById);

router.post('/books-upload/:id', fileMulter.single('book'), bookController.uploadForId);

router.post('/books', bookController.create);

router.put('/books/:id', bookController.update);

router.delete('/books/:id', bookController.remove);

router.post('/user/login', userController.login)

module.exports = router;