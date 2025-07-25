import { useEffect, useState } from 'react';
import type { Task } from './types';
import { getTasks, addTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(error => {
        console.error('Ошибка при загрузке задач:', error);
        alert('Ошибка при загрузке задач');
      });
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      const task = await addTask(newTitle);
      setTasks([...tasks, task]);
      setNewTitle('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      alert('Ошибка при добавлении задачи');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      alert('Ошибка при удалении задачи');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>ToDo</h1>
      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="Новая задача"
      />
      <button onClick={handleAdd}>Добавить</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDelete(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
