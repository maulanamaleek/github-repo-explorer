
export const truncateChar = (
  str: string | null,
  amount: number
): string | null => {
  if (!str) {
    return null;
  }

  if (str.length < amount) {
    return str;
  }

  return `${str.slice(0, amount)}...`;
}
