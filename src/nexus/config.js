function isDevelopment() {
  return (process.env.NODE_ENV !== 'production');
}

function isProduction() {
  return (process.env.NODE_ENV === 'production');
}

export default {
  isDevelopment,
  isProduction,
};
