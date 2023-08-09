export const getError = (error) => {
  return error.response && error.response.data.message
    ? true
    : false
};
