import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function DatePicker({ date, onChange, onClose, isOpen }: DatePickerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
      <input
        type="datetime-local"
        value={date ? date.toISOString().slice(0, 16) : ''}
        onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => onChange(null)}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Done
        </button>
      </div>
    </div>
  );
}