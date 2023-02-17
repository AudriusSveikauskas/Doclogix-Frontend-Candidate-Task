import axios, { AxiosError } from 'axios';
import post from './fetch/post';

const signInUser = async (username: string, password: string) => {
  const data = JSON.stringify({
    username,
    password,
  });

  try {
    const res = await post('auth/login', data);
    if (res) {
      return { status: 200, data: JSON.parse(res.request.response) };
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return {
        status: `${err.response.status}`,
        data: err.response.data.message,
      };
    }
    if (err instanceof AxiosError) {
      return { status: err.status, data: err.message };
    }
  }
  return {
    status: undefined,
    data: 'Unknown error. Contact site administrator.',
  };
};

export default signInUser;
