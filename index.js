const express = require('express');
const bodyParser = require('body-parser');
const webRouter = require('./src/routes/web');
const bookRouter = require('./src/routes/book');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.get('/health-check', (req, res) => {
    res.json({ 'message': 'ok' });
})

app.use('/api', webRouter);
app.use('/book', bookRouter);


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
});