const generateResponseObject = (data) => {
  return {
    data,
  };
};

const generateError = (error) => {
  return {
    error,
  };
};

module.exports = {
  generateResponseObject,
  generateError,
};