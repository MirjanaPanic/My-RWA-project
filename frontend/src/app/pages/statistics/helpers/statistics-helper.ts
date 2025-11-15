export function dateToString(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export function calculatePreviousWeek(thisWeek: string): string {
  const date = new Date(thisWeek);
  date.setDate(date.getDate() - 7);
  return dateToString(date);
}

export function calculateNextWeek(thisWeek: string): string {
  const date = new Date(thisWeek);
  date.setDate(date.getDate() + 7);
  return dateToString(date);
}

export function isNextWeekInFuture(thisWeek: string) {
  const futureWeek = new Date(thisWeek);
  futureWeek.setDate(futureWeek.getDate() + 7);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayWeek = new Date(today);

  if (futureWeek >= todayWeek) {
    return true;
  } else {
    return false;
  }
}
