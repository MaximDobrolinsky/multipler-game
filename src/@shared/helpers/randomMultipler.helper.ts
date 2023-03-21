export const generateRandomMultipler = (
  min: number,
  max: number,
  decimalPlaces: number,
) => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);

  return Math.floor(rand * power) / power;
};
