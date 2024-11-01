const router = require('express').Router();
const mongoose = require('mongoose');
const Todo = require('../models/task');

//для проверки допустимых символов (только буквы и цифры)
const taskRegex = /^[a-zA-Z0-9\s]+$/;

router.post("/add/todo", async (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).send('Todo task cannot be empty.');
    }

    if (todo.length < 3 || todo.length > 100) {
        return res.status(400).send('Task description must be between 3 and 100 characters.');
    }

    if (!taskRegex.test(todo)) {
        return res.status(400).send('Task description can only contain alphanumeric characters and spaces.');
    }

    const newTodo = new Todo({ todo });

    try {
        await newTodo.save();
        console.log('Successfully added todo!');
        res.redirect('/');
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Internal server error');
    }
});

// Получение всех задач
router.get("/todos", async (req, res) => {
    try {
        const allTodo = await Todo.find(); 
        res.status(200).json(allTodo);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal server error');
    }
});

// Удаление задачи по ID
router.delete("/delete/todo/:_id", async (req, res) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('Invalid Todo ID');
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(_id);
        if (!deletedTodo) {
            return res.status(404).send('Todo not found');
        }
        console.log('Deleted Todo successfully!');
        res.status(200).send('Todo deleted successfully');
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).send('Internal server error');
    }
});

// Обновление задачи с дополнительной валидацией
router.post("/update/todo/:_id", async (req, res) => {
    const { _id } = req.params;
    const { todo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send('Invalid Todo ID');
    }

    if (!todo) {
        return res.status(400).send('Todo task cannot be empty.');
    }

    if (todo.length < 3 || todo.length > 100) {
        return res.status(400).send('Task description must be between 3 and 100 characters.');
    }

    if (!taskRegex.test(todo)) {
        return res.status(400).send('Task description can only contain alphanumeric characters and spaces.');
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(_id, { todo }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        console.log('Updated Todo successfully!');
        res.redirect('/');
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
