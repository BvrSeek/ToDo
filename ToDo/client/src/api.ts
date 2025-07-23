import type { Task } from './types';

const API_URL = 'http://127.0.0.1:3000/api/tasks';


export async function getTasks(): Promise<Task[]> {
  console.log('[API] getTasks: GET', API_URL);
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log('[API] getTasks: response', data);
  return data;
}


export async function addTask(title: string): Promise<Task> {
  console.log('[API] addTask: POST', API_URL, { title });
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  const data = await res.json();
  console.log('[API] addTask: response', data);
  return data;
}


export async function deleteTask(id: number): Promise<void> {
  console.log('[API] deleteTask: DELETE', `${API_URL}/${id}`);
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  console.log('[API] deleteTask: response status', res.status);
}