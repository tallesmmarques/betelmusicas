import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export default api;

export const fetcher = async (pathname: string) => {
  const response = await api.get(pathname);
  return response.data;
};
