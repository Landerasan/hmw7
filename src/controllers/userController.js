async function login(req, res, next) {
    try {
        res.status('201').json({ id: 1, mail: "test@mail.ru" });
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
}

module.exports = {
    login
};