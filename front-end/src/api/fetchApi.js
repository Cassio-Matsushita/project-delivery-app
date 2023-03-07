import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
  try {
    const token = await api.post('/login', { email, password })
      .catch((error) => {
        console.error(error);
      });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const data = await api.get('/products')
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const validateUser = async () => {
  try {
    const data = await api.get('/login/validate')
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
