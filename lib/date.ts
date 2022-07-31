export const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const getDate = (unix: number): string => {
  const date = new Date(unix);
  return date.toLocaleDateString(undefined, dateFormat);
};

export const getDateFromString = (string: string): string => {
  const date = new Date(string);
  return date.toLocaleDateString(undefined, dateFormat);
};
