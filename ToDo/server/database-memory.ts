// Простая имитация базы данных в памяти для тестирования
interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at?: Date;
}

let tasks: Task[] = [
  { id: 1, title: 'Пример задачи', completed: false, created_at: new Date() }
];

let nextId = 2;

// Имитация функций базы данных
export async function initDatabase() {
  console.log('База данных (память) инициализирована');
}

export async function getAllTasks() {
  return tasks;
}

export async function createTask(title: string) {
  const newTask: Task = {
    id: nextId++,
    title,
    completed: false,
    created_at: new Date()
  };
  tasks.push(newTask);
  return newTask;
}

export async function removeTask(id: number) {
  tasks = tasks.filter(task => task.id !== id);
}

export async function updateTask(id: number, completed: boolean) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = completed;
    return task;
  }
  return null;
}
