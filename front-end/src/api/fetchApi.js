import axios from 'axios';

const login = async (email, password) => {
  const { data } = await axios.post('https://localhost:3000/login', { email, password })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export default login;
