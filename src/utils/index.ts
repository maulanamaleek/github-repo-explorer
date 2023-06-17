
export const truncateChar = (str: string, amount: number) => {
  if (str.length < amount) {
    return str;
  }

  return `${str.slice(0, amount)}...`;
}
