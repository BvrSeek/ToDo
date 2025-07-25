import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

// Создание SQLite базы данных
const db: Database = new sqlite3.Database('./tasks.db');

// Создание таблицы tasks если она не существует
export async function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `, (err) => {
      if (err) {
        console.error('Ошибка инициализации базы данных:', err);
        reject(err);
      } else {
        console.log('SQLite база данных инициализирована');
        resolve();
      }
    });
  });
}

// Функции для работы с задачами
export async function getAllTasks(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Преобразуем числовые boolean в настоящие boolean
        const tasks = rows.map((row: any) => ({
          ...row,
          completed: Boolean(row.completed)
        }));
        resolve(tasks);
      }
    });
  });
}

export async function createTask(title: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO tasks (title) VALUES (?)',
      [title],
      function(err) {
        if (err) {
          reject(err);
        } else {
          // Получаем созданную задачу
          db.get(
            'SELECT * FROM tasks WHERE id = ?',
            [this.lastID],
            (err, row: any) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  ...row,
                  completed: Boolean(row.completed)
                });
              }
            }
          );
        }
      }
    );
  });
}

export async function removeTask(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function updateTask(id: number, completed: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE tasks SET completed = ? WHERE id = ?',
      [completed ? 1 : 0, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          // Получаем обновленную задачу
          db.get(
            'SELECT * FROM tasks WHERE id = ?',
            [id],
            (err, row: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(row ? {
                  ...row,
                  completed: Boolean(row.completed)
                } : null);
              }
            }
          );
        }
      }
    );
  });
}

export default db;
