function formatDate(dateString) {
  // Format dateString to Month DD, YYYY
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default formatDate;
