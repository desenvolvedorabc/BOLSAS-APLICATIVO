import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        res.status(200).json({ status: 200, data: response.data });
      })
      .catch((error) => {
        console.log('error: ', error);
        res.status(200).json({
          status: 401,
          message: 'Usuário ou senha inválidos, revise os dados',
        });
      });
  }
}
