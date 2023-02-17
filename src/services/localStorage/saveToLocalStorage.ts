const saveToLocalStorage = (data: ICredentials) => {
  const signInCredentials = {
    username: data.username,
    password: data.password,
  };

  localStorage.setItem('signInCredentials', JSON.stringify(signInCredentials));
};

export default saveToLocalStorage;
