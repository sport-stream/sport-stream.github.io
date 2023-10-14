export const formatDateTime = (gameTime: string) => {
  if (!gameTime) return new Date().toLocaleString("en-US");
  const [day, month, _at, time] = gameTime.split(" ");
  const formattedDate = new Date();
  formattedDate.setUTCDate(Number(day));
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];
  const monthNumber = monthNames.indexOf(month.slice(0, 3).toLowerCase());
  formattedDate.setUTCMonth(monthNumber);
  formattedDate.setUTCHours(parseInt(time.split(":")[0]));
  formattedDate.setUTCMinutes(parseInt(time.split(":")[1]));
  return formattedDate.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};
