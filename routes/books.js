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
        data.id = document.id
        books.push(data);
    });
    res.send(books); 
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const docRef = await db.collection('books').doc(id).get();
    
    if(!docRef.exists){
        res.status(404).send('Book does not excist');
        return;
    }
    const data = docRef.data()
    res.send(data)
});

router.post('/', async (req, res) =>{
    const object = req.body;

    if(!isBookObject(object)){
        res.sendStatus(400);
        return;
    }
    const docRef = await db.collection('books').add(object);
    res.send(docRef.id);
});

router.put('/:id', async (req, res) => {
    const object = req.body;
    const id = req.params.id
    
    if(!isBookObject(object) || !id){
        res.sendStatus(400);
        return;
    }
    const docRef = db.collection('books').doc(id)
    await docRef.set(object, {merge: true})
    res.sendStatus(200);
})

function isBookObject(incObject){
    if(!incObject){
        return false;
    }else if(!incObject.title || !incObject.author || !incObject.genre){
        return false;
    } else{
        return true;
    }
}

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    if(!id){
        res.sendStatus(400);
        return
    }
    await db.collection('/books').doc(id).delete();
    res.sendStatus(200);
})

module.exports = router;