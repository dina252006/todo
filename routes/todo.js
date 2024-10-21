const router = require('express').Router();
const Todo = require('../models/task');
const { body, validationResult } = require('express-validator');

router.post(
    "/add/todo", 
    body('todo').not().isEmpty().withMessage('Task cannot be empty').isLength({ min: 3 }).withMessage('Task must be at least 3 characters long'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { todo } = req.body;
        const newTodo = new Todo({ todo });

        newTodo
        .save()
        .then(() => {
            console.log('Successfully added todo!');
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Failed to add todo:', err);
            res.status(500).json({ error: 'Failed to add todo' });
        });
    }
);

router.get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;

    Todo.deleteOne({ _id })
    .then(() => {
        console.log('Deleted Todo successfully!');
        res.redirect('/');
    })
    .catch((err) => {
        console.error('Failed to delete todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
    });
});

module.exports = router;
