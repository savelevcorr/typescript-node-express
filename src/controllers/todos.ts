import {RequestHandler} from "express";
import {Todo} from '../models/todo';

type ResBody = {
    text: string
};

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as ResBody).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);
    res.status(201)
        .json({
            message: 'Created the todo',
            createdTodo: newTodo
        });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200)
        .json({todos: TODOS});
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, nex) => {
    const {id} = req.params;
    const updatedText = (req.body as ResBody).text;
    const foundIndex = TODOS.findIndex(todo => todo.id === id);

    if (foundIndex < 0) {
        throw new Error('Could not find this todo!');
    } else {
        TODOS[foundIndex] = new Todo(id, updatedText);
    }

    res.json({message: 'Updated!', updatedTodo: TODOS[foundIndex]});
};

export const deleteTodo: RequestHandler = (req, res, next) => {
    const {id} = req.params;
    const foundIndex = TODOS.findIndex(todo => todo.id === id);

    if (foundIndex < 0) {
        throw new Error('Could not find this todo!');
    } else {
        TODOS.splice(foundIndex, 1);
    }

    res.json({
        message: 'Todo deleted!'
    });
};