export default async function login(email, password) {
  try {
    const { data } = await axios.post('http://localhost:3001/login', {
      email,
      password,
    })
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
}
