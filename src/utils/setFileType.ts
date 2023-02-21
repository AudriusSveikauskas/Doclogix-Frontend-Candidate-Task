const setFileType = (str: string) => {
  const arr = str.split('/');

  return arr[1];
};

export default setFileType;
