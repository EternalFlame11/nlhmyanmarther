import React, { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';
import { MYANMAR_TIMEZONE } from '../utils/dateUtils';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: MYANMAR_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(time);

  return (
    <div className="flex items-center space-x-2 text-lg font-medium">
      <ClockIcon className="w-5 h-5" />
      <time>{formattedTime}</time>
      <span className="text-sm text-gray-500">(MMT)</span>
    </div>
  );
}