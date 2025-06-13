

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};


export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};


export const isToday = (day, currentDate) => {
  const today = new Date();
  return (
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  );
};

export const isSelectedDate = (day, currentDate, selectedDate) => {
  if (!selectedDate) return false;

  return (
    day === selectedDate.getDate() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getFullYear() === selectedDate.getFullYear()
  );
};

export const generateCalendarGrid = (currentDate) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, isCurrentMonth: false });
  }

  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, isCurrentMonth: true });
  }

  return calendarDays;
};


export const navigateMonth = (currentDate, direction) => {
  const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
  return newDate;
};

export const formatSelectedDate = (date) => {
  if (!date || isNaN(date)) return 'No date selected';
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
