import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Clock } from './components/Clock';
import { ImageSlider } from './components/ImageSlider';
import { TaskList } from './components/TaskList';
import { DailyMessage } from './components/DailyMessage';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Read App</h1>
          <div className="flex items-center gap-4">
            <Clock />
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <ImageSlider />
        
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            <TaskList />
          </section>
          
          <section>
            <h2 className="text-lg font-semibold mb-4">Daily Inspiration</h2>
            <DailyMessage />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;