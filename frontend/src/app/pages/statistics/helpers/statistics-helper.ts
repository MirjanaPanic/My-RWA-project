export function toISODate(date: Date): string {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
}

export function previousWeek(thisWeek: string): string {
  const date = new Date(thisWeek);
  date.setDate(date.getDate() - 7);
  return toISODate(date);
}
