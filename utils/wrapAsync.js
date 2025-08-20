// TO WRITE TRY/CATCH IN BETTER FORMAT

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
