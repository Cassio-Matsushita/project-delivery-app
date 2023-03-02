import axios from 'axios';

const login = async (email, password) => {
  try {
    const data = await axios.post('http://localhost:3001/login', { email, password })
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
