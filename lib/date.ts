export const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const getDate = (unix: number): string => {
  const date = new Date(unix);
  return date.toLocaleDateString(undefined, dateFormat);
};
