import { Pool } from 'pg';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

// Конфигурация подключения к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'todo_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Создание таблицы tasks если она не существует
export async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('База данных инициализирована');
  } catch (error) {
    console.error('Ошибка инициализации базы данных:', error);
  }
}

// Функции для работы с задачами
export async function getAllTasks() {
  const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
  return result.rows;
}

export async function createTask(title: string) {
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  return result.rows[0];
}

export async function removeTask(id: number) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

export async function updateTask(id: number, completed: boolean) {
  const result = await pool.query(
    'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
    [completed, id]
  );
  return result.rows[0];
}

export default pool;
