export const getMonth = () => {
  const date = new Date();
  const day = date.getDay();
  let month;

  switch (day) {
    case day < 10:
      month =
        date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
      break;

    default:
        month =
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() +1;
      break;
  }

  return month;
};
