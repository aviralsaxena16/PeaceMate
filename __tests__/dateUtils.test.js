import { getTodayDetails } from '../src/utils/dateUtils'; 
describe('getTodayDetails', () => {
  test('returns today’s date in correct format', () => {
    const result = getTodayDetails();
    
    
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const expected = today.toLocaleDateString('en-US', options);

    expect(result).toBe(expected);
  });

  test('result is a string containing weekday, month, and day', () => {
    const result = getTodayDetails();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^[A-Za-z]+,? [A-Za-z]+ \d{1,2}$/);
  });
});
