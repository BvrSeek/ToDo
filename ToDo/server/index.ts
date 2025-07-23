// server/index.ts
import type { Task } from './types';

const debug: Task = { id: 1, title: 'Test', completed: false };
console.log('Пример задачи:', debug);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks: Task[] = [
  { id: 1, title: 'Пример задачи', completed: false }
];

app.get('/', (_req, res) => {
  res.send('Сервер работает!');
});

// Получить все задачи
app.get('/api/tasks', (_req, res) => {
  res.json(tasks);
});

// Добавить новую задачу
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const newTask: Task = {
    id: Date.now(), // простая генерация id
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Удалить задачу по id
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Сервер доступен по адресам:');
  console.log('http://localhost:3000');
  console.log('http://127.0.0.1:3000');
});