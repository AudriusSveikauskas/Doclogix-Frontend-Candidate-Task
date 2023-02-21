const setFileDate = (millis: number) => {
  const date = new Date(millis);

  return date.toISOString();
};

export default setFileDate;
