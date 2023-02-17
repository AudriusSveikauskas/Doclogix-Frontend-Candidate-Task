import axios from 'axios';

const post = async (endpoint: string, data: string) =>
  axios({
    url: `https://dummyjson.com/${endpoint}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
export default post;
