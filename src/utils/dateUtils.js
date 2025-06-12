
export const getTodayDetails = () => {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formatted = date.toLocaleDateString('en-US', options);
  return formatted; 
};
