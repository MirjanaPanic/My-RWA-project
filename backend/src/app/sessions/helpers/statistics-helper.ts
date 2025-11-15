export function getWeekDays(weekStart: string) {
  const firstDay = new Date(weekStart);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    days.push(date);
  }
  return days;
}

export function calculateFocusTime(
  currentRound: number,
  roundTime: number,
  timeLeft: number,
): number {
  const focustime = (currentRound - 1) * roundTime + (roundTime - timeLeft);
  return focustime;
}

export function dateToString(date: Date) {
  return date.toISOString().split('T')[0];
}
