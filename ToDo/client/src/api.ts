import type { Task } from './types';

const API_URL = 'https://vigilant-broccoli-jjg4grp5grxj2jqq-3000.app.github.dev/api/tasks';


export async function getTasks(): Promise<Task[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[API] getTasks: error', error);
    throw error;
  }
}


export async function addTask(title: string): Promise<Task> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[API] addTask: error', error);
    throw error;
  }
}


export async function deleteTask(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error('[API] deleteTask: error', error);
    throw error;
  }
}