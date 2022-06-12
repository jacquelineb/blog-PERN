function formatDate(dateString) {
  // date: Month DD, YYYY
  // time: hh:mm:ss
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-us'),
  };
}

export default formatDate;
