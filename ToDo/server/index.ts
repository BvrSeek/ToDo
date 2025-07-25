// server/index.ts
import type { Task } from './types';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { initDatabase, getAllTasks, createTask, removeTask } from './database-sqlite';

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация базы данных при запуске
initDatabase();

app.get('/', (_req, res) => {
  res.send('Сервер работает с PostgreSQL!');
});

// Получить все задачи
app.get('/api/tasks', async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Ошибка получения задач:', error);
    res.status(500).json({ error: 'Ошибка получения задач' });
  }
});

// Добавить новую задачу
app.post('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Название задачи обязательно' });
    }
    const newTask = await createTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Ошибка создания задачи:', error);
    res.status(500).json({ error: 'Ошибка создания задачи' });
  }
});

// Удалить задачу по id
app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Неверный ID задачи' });
    }
    await removeTask(id);
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка удаления задачи:', error);
    res.status(500).json({ error: 'Ошибка удаления задачи' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Сервер доступен по адресам:');
  console.log('https://vigilant-broccoli-jjg4grp5grxj2jqq-3000.app.github.dev');
  console.log('http://localhost:3000');
  console.log('База данных: SQLite');
});