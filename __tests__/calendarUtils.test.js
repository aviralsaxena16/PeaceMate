import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isToday,
  isSelectedDate,
  generateCalendarGrid,
  navigateMonth,
  formatSelectedDate,
} from '../src/utils/calendarUtils'; 

describe('Calendar Utils', () => {
  test('getDaysInMonth returns correct number of days', () => {
    expect(getDaysInMonth(new Date('2025-02-01'))).toBe(28);
    expect(getDaysInMonth(new Date('2024-02-01'))).toBe(29); 
    expect(getDaysInMonth(new Date('2025-06-01'))).toBe(30);
  });

  test('getFirstDayOfMonth returns correct weekday index', () => {
    expect(getFirstDayOfMonth(new Date('2025-06-01'))).toBe(0);
  });

  test('isToday returns true for today’s date', () => {
    const today = new Date();
    expect(isToday(today.getDate(), today)).toBe(true);
  });

  test('isSelectedDate matches only exact date', () => {
    const date = new Date('2025-06-13');
    expect(isSelectedDate(13, date, new Date('2025-06-13'))).toBe(true);
    expect(isSelectedDate(12, date, new Date('2025-06-13'))).toBe(false);
  });

  test('generateCalendarGrid includes correct days', () => {
    const date = new Date('2025-06-01');
    const grid = generateCalendarGrid(date);
    expect(grid.length).toBeGreaterThanOrEqual(30);
    expect(grid.filter(d => d.day === null).length).toBe(0); 
    expect(grid.find(d => d.day === 1)?.isCurrentMonth).toBe(true);
  });

  test('navigateMonth correctly goes forward/back', () => {
    const june = new Date('2025-06-01');
    const july = navigateMonth(june, 1);
    expect(july.getMonth()).toBe(6); 
    const may = navigateMonth(june, -1);
    expect(may.getMonth()).toBe(4); 
  });

  test('formatSelectedDate returns human-readable string', () => {
    const date = new Date('2025-06-10');
    const formatted = formatSelectedDate(date);
    expect(formatted).toBe('Tuesday, June 10, 2025');
  });

  test('formatSelectedDate handles invalid input', () => {
    expect(formatSelectedDate(null)).toBe('No date selected');
    expect(formatSelectedDate('invalid')).toBe('No date selected');
  });
});
