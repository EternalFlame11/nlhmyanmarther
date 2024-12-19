import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskItem } from './TaskItem';
import type { TaskNote } from '../types';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskNote[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: TaskNote = {
      id: Date.now().toString(),
      title: newTask,
      content: '',
      reminder: null,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const editTask = (id: string, title: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const setReminder = (id: string, date: Date | null) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, reminder: date } : task
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onSetReminder={setReminder}
          />
        ))}
      </ul>
    </div>
  );
}