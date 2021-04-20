const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const books = require('./routes/books');

const PORT = 1340;
const staticFolder = path.join(__dirname, 'static');

app.use(express.json())
app.use( cors() );
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.params)
    next()
})

app.use( express.static(staticFolder) );

app.use('/books', books)

app.listen(PORT, () => {
    console.log('Server is listening on port' + PORT);
});

