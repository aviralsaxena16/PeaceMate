import React from 'react';
import MukuMascot from './MukuMascot';
import {
  MONTH_NAMES,
  DAYS_OF_WEEK,
  generateCalendarGrid,
  navigateMonth,
  isToday,
  isSelectedDate,
  formatSelectedDate
} from '../utils/calendarUtils';

const CalendarDisplay = ({ handleDateChange, selectedDate }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handleMonthNavigation = (direction) => {
    setCurrentDate(navigateMonth(currentDate, direction));
  };

  const handleDateSelect = (day) => {
    if (!day) return;

    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    handleDateChange(newDate);
  };

  const getDateCellStyles = (dayObj) => {
    if (!dayObj.isCurrentMonth) return 'text-gray-300 cursor-not-allowed';

    if (isSelectedDate(dayObj.day, currentDate, selectedDate))
      return 'text-white shadow-lg transform scale-105';

    if (isToday(dayObj.day, currentDate))
      return 'bg-orange-100 text-orange-600 font-bold border-2 border-orange-300';

    return 'text-gray-700 hover:bg-gray-100';
  };

  const getDateCellBackground = (dayObj) => {
    if (dayObj.isCurrentMonth && isSelectedDate(dayObj.day, currentDate, selectedDate)) {
      return { background: 'linear-gradient(45deg, #ea580c, #ec4899)' };
    }
    return {};
  };

  const calendarGrid = generateCalendarGrid(currentDate);

  return (
    <div
      className="h-[90vh] flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)' }}
    >
      <div className="w-full max-w-xl px-4">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1">
            <span style={{ color: '#ea580c' }}>Your Daily</span>{' '}
            <span style={{ color: '#ec4899' }}>Reflection</span>
          </h1>
          <p className="text-sm text-gray-600">Choose a date to reflect on your journey</p>
        </header>

        {/* Calendar Box */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => handleMonthNavigation(-1)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(45deg, #ea580c, #ec4899)' }}
              >
                <span className="text-white text-sm font-bold">‹</span>
              </button>

              <h2 className="text-lg font-bold text-gray-800">
                {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <button
                onClick={() => handleMonthNavigation(1)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(45deg, #ea580c, #ec4899)' }}
              >
                <span className="text-white text-sm font-bold">›</span>
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="text-center py-1 text-xs font-semibold text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarGrid.map((dayObj, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(dayObj.day)}
                  disabled={!dayObj.isCurrentMonth}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg 
                    text-xs font-medium transition-all duration-200 hover:scale-105
                    ${getDateCellStyles(dayObj)}
                  `}
                  style={getDateCellBackground(dayObj)}
                >
                  {dayObj.day}
                </button>
              ))}
            </div>

            {/* Mascot */}
            <div className="absolute bottom-2 left-2">
              <MukuMascot />
            </div>
          </div>

          {/* Selected Date Bar */}
          <div
            className="px-4 py-2 text-center text-white"
            style={{ background: 'linear-gradient(45deg, #ea580c, #ec4899)' }}
          >
            <p className="text-sm font-medium">Selected: {formatSelectedDate(selectedDate)}</p>
          </div>
        </div>

        {/* Footer Stats */}
        <footer className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="flex -space-x-1">
              {[
                'from-orange-400 to-pink-400',
                'from-pink-400 to-purple-400',
                'from-purple-400 to-orange-400',
                'from-orange-500 to-pink-500'
              ].map((gradient, i) => (
                <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-r ${gradient}`} />
              ))}
            </div>
            <span className="text-xs font-medium">Made By Aviral Saxena</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CalendarDisplay;
