import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarDisplay({ value, onChange }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Select a date</h2>
      <Calendar
        onChange={onChange}   
        value={value}  
         locale="en-US"      
      />
    </div>
  );
}
