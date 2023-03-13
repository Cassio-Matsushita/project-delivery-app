import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const login = async (email, password) => {
  try {
    const token = await api.post('/login', { email, password });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const data = await api.get('/products');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const createSale = async (sale, token) => {
  try {
    const data = await api.post('/sales', sale, { headers: { Authorization: token } });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSaleStatus = async (saleId, saleStatus) => {
  try {
    const data = await api.put('/sales', { saleId, saleStatus });
    return data;
  } catch (error) {
    console.log('Error fetching updateSale:', error);
  }
};

export const getSales = async () => {
  try {
    const data = await api.get('/sales');
    return data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
};

export const getUsers = async () => {
  try {
    const data = await api.get('/users');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const validateUser = async () => {
  try {
    const data = await api.get('/login/validate');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
