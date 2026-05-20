const parseNumber = (value) => {
  return Number(value.replace(/[^\d.-]/g, ""));
};

export default parseNumber



