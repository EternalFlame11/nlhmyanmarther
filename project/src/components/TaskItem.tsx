import React, { useState } from 'react';
import { Calendar, Check, Pencil, Trash2 } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { formatDateTime } from '../utils/dateUtils';
import type { TaskNote } from '../types';

interface TaskItemProps {
  task: TaskNote;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onSetReminder: (id: string, date: Date | null) => void;
}

export function TaskItem({ task, onEdit, onDelete, onToggleComplete, onSetReminder }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow dark:bg-gray-800 group relative">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 px-2 py-1 mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          autoFocus
        />
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
          {task.reminder && (
            <span className="text-xs text-blue-500 dark:text-blue-400">
              {formatDateTime(task.reminder)}
            </span>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`p-1 text-gray-500 hover:text-blue-500 ${task.reminder ? 'text-blue-500' : ''}`}
          >
            <Calendar className="w-5 h-5" />
          </button>
          <DatePicker
            date={task.reminder}
            onChange={(date) => {
              onSetReminder(task.id, date);
              setIsDatePickerOpen(false);
            }}
            onClose={() => setIsDatePickerOpen(false)}
            isOpen={isDatePickerOpen}
          />
        </div>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditText(task.title);
          }}
          className="p-1 text-gray-500 hover:text-yellow-500"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-gray-500 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onToggleComplete(task.id)}
          className="p-1 text-gray-500 hover:text-green-500"
        >
          <Check className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
}