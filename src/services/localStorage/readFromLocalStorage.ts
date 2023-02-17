/* eslint operator-linebreak: ["error", "after"] */

type CredentialsProps = ICredentials;

const readFromLocalStorage = () => {
  const signInCredentials = localStorage.getItem('signInCredentials');
  let signInCredentialsObj: CredentialsProps;

  const isLoginPropsType = (obj: CredentialsProps): obj is ICredentials =>
    (obj as ICredentials).username !== null &&
    (obj as ICredentials).password !== null;

  if (signInCredentials !== null) {
    signInCredentialsObj = JSON.parse(signInCredentials);

    if (isLoginPropsType(signInCredentialsObj)) {
      return signInCredentialsObj;
    }
  }

  return null;
};

export default readFromLocalStorage;
