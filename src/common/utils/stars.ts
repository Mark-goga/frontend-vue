export const getStarsFromEstimation = (rating: number) => {
  const normalizedRating = rating / 2;
  const result = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(normalizedRating)) {
      result.push('full');
    } else if (i - 0.5 <= normalizedRating) {
      result.push('half');
    } else {
      result.push('empty');
    }
  }

  return result;
};
