export const stringifyDateFromString = date => {
  const newDate = new Date(date);

  return newDate.toString();
};

export const daysBetweenTodayAndDate = date => {
  const pastDate = new Date(date);
  const todayDate = new Date();
  const diffTime = Math.abs(todayDate - pastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + ' days';
};
