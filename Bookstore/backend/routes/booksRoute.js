import express from 'express';

import Book from '../models/bookModel.js';
const router = express.Router();



router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: 'All fields are required: TITLE , AUTHOR, PUBLISHER' });
        }
        const newBook ={
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            };
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
    }
});
//Route to get al  books
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).send(
            {count: books.length,
            data : books}
        );
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
    }
});

//Route to get books by id
router.get('/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const books = await Book.findById(id);
        return res.status(200).send(books);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
    }
});

//route for updating a book
router.put('/:id', async (req, res) => {
    try{

        if (!req.body.title && !req.body.author && !req.body.publishYear){
            return res.status(400).send({ message: 'All fields are required: TITLE , AUTHOR, PUBLISHER' });
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});

        if (!result){
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({message: 'Book updated successfully', data: result});


    }
    catch(error){
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
    }
});

//route for deleting a book
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({message: 'Book deleted successfully', data: result});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
        }
});

export default router;