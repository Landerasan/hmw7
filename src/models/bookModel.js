const bookHelper = require('../helpers/bookHelper');


class Book {

    constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = bookHelper.generateId()) {
        const missingFields = [];
        Object.entries({ title, description, authors, favorite, fileCover, fileName, fileBook, id }).forEach(([key, value]) => {
            if (!value) {
                missingFields.push(key);
            }
            this[key] = value;

        });
        if (missingFields.length) {
            throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
        }
    }

}

module.exports = {
    Book
}