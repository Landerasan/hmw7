const bookModel = require('../models/bookModel');
const fs = require('fs');
const path = require('path');

let bookList = new Array()

function returnBookList(){
    return bookList
}

function findBook(id){
    return bookList.find(e => e.id === id)
}


async function get(req, res, next) {
    try {
        res.json(bookList);
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        let bookToFind = findBook(req.params.id)
        if(bookToFind === undefined){
            res.status(404)
        }
        else{
            res.json(bookToFind);
        }
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

async function downloadById(req, res, next){
    try {
        let bookToFind = bookList.findIndex(e => e.id === req.params.id)
        if(bookToFind == -1){
            res.status(404).json(`no book with id = ${req.params.id}`)
        }
        else{
            let filePath = path.join(__dirname, '../../public/books')
            const file = `${filePath}/${bookList[bookToFind].fileBook}`
            res.download(file, bookList[bookToFind].title)
        }
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

async function uploadForId(req, res, next){
    try {
        let filePath = path.join(__dirname, '../../public/books')
        console.log(`${filePath}\\${req.file.filename}`)
        let bookToFind = bookList.findIndex(e => e.id === req.params.id)
        if(bookToFind == -1){
            res.status(404).json(`no book with id = ${req.params.id}`)
            fs.unlinkSync(`${filePath}\\${req.file.filename}`)
        }
        else{
            bookList[bookToFind].fileBook = req.file.filename
            res.json(`file uploaded`);
        }
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        let book = new bookModel.Book(req.body.title, req.body.description, req.body.authors, req.body.favorite, req.body.fileCover, req.body.fileName, req.body.fileBook)
        bookList.push(book)
        res.json(book);
    } catch (err) {
        res.status(500).json(err.message)
        next(err);
    }
}


async function update(req, res, next) {
    console.log(req.body)
    try {
        let bookToFind = bookList.findIndex(e => e.id === req.params.id)
        if(bookToFind == -1){
            res.status(404)
        }
        else{
            Object.keys(req.body).map(e => {
                if(e != "id" && bookList[bookToFind].hasOwnProperty(e)){
                    bookList[bookToFind][e] = req.body[e]
                }
            })
            res.send(bookList[bookToFind]);
        }
    } catch (err) {
        console.error(`Error while deleting programming language`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        let bookToFind = bookList.findIndex(e => e.id === req.params.id)
        if(bookToFind == -1){
            res.status(404)
        }
        else{
            bookList.slice(bookToFind, 1);
            res.send('ok');
        }
    } catch (err) {
        console.error(`Error while deleting programming language`, err.message);
        next(err);
    }
}

module.exports = {
    get,
    getById,
    downloadById,
    uploadForId,
    create,
    update,
    remove,
    returnBookList,
    findBook
};
