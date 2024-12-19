export const MYANMAR_TIMEZONE = 'Asia/Yangon';

export function formatDateTime(date: Date | null): string {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    timeZone: MYANMAR_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}