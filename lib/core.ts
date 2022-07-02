export function calculateReadingLength(content: string | number) {
  if (typeof content === "string") return Math.ceil(content.length / 1000);
  else return Math.ceil(content / 1000);
}
