import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api/auth/';

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.code === 'ERR_BAD_RESPONSE') {
      const response = await axios.post(
        'refresh',
        {},
        { withCredentials: true },
      );
      console.log(response);
      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer${response.data}`;
        return axios(error.config);
      }
    }
    return error;
  },
);
