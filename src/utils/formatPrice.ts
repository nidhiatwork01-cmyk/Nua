export const formatPrice = (price: number): string => {
  const converted = Math.round(price * 80); // USD to INR conversion rate (~80 INR per USD)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(converted);
};
