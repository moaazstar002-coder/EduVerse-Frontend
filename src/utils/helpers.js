export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const ratingColor = (rating) => {
  if (rating >= 4.5) return '#10b981';
  if (rating >= 4) return '#f59e0b';
  return '#ef4444';
};
