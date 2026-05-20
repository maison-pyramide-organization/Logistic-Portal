const hasDatePassed = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);

  // create date at end of the day
  const dueDate = new Date(year, month - 1, day, 23, 59, 59);

  return new Date() > dueDate;
};

export default hasDatePassed;
