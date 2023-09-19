const parseDate = (dateString: Date) => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return { year, month, day };
};

export default parseDate;
