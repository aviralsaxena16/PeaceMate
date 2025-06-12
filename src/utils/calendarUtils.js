// Date utility functions for calendar operations

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Get total days in a given month
 * @param {Date} date 
 * @returns {number}
 */
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Get the day of the week for the first day of the month (0 = Sunday)
 * @param {Date} date 
 * @returns {number}
 */
export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

/**
 * Check if a specific day is today
 * @param {number} day 
 * @param {Date} currentDate 
 * @returns {boolean}
 */
export const isToday = (day, currentDate) => {
  const today = new Date();
  return (
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a day matches the selected date
 * @param {number} day 
 * @param {Date} currentDate 
 * @param {Date} selectedDate 
 * @returns {boolean}
 */
export const isSelectedDate = (day, currentDate, selectedDate) => {
  if (!selectedDate) return false;

  return (
    day === selectedDate.getDate() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getFullYear() === selectedDate.getFullYear()
  );
};

/**
 * Generate calendar grid data including empty cells for proper alignment
 * @param {Date} currentDate 
 * @returns {Array<{day: number|null, isCurrentMonth: boolean}>}
 */
export const generateCalendarGrid = (currentDate) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Empty cells for alignment
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, isCurrentMonth: false });
  }

  // Actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, isCurrentMonth: true });
  }

  return calendarDays;
};

/**
 * Navigate to next/previous month
 * @param {Date} currentDate 
 * @param {number} direction - 1 for next month, -1 for previous
 * @returns {Date}
 */
export const navigateMonth = (currentDate, direction) => {
  const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
  return newDate;
};

/**
 * Format date for display like "Monday, June 10, 2025"
 * @param {Date} date 
 * @returns {string}
 */
export const formatSelectedDate = (date) => {
  if (!date || isNaN(date)) return 'No date selected';
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
