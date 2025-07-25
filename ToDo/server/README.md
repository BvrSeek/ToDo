# ToDo App с PostgreSQL

## Настройка базы данных

### 1. Установка PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (через Homebrew)
brew install postgresql
brew services start postgresql
```

### 2. Создание базы данных

```bash
# Войти в PostgreSQL
sudo -u postgres psql

# Создать базу данных
CREATE DATABASE todo_db;

# Создать пользователя (опционально)
CREATE USER todo_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;

# Выйти
\q
```

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и настройте параметры:

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```
DB_HOST=localhttps://vigilant-broccoli-jjg4grp5grxj2jqq-3000.app.github.dev/api/tasks'host
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=password
PORT=3000
```

### 4. Запуск

```bash
# Установка зависимостей
npm install

# Запуск сервера
npm run dev
```

Сервер автоматически создаст таблицу `tasks` при первом запуске.

## API Endpoints

- `GET /api/tasks` - получить все задачи
- `POST /api/tasks` - создать задачу
- `DELETE /api/tasks/:id` - удалить задачу

## Структура таблицы tasks

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
