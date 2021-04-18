const getDatabase = require('../database');
const db = getDatabase();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const booksRef = db.collection('books');
    const snapshot = await booksRef.get();
    if( snapshot.empty ){
        res.send([]);
        return;
    }
    let books = [];
    snapshot.forEach(document => {
    const data = document.data();
    books.push(data);
    });
    res.send(books); 
})


module.exports = router;