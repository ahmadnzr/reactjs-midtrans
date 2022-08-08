const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};

module.exports = { asyncWrapper, getCurrentTimestamp };
