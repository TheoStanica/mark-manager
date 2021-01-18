import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'Application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      try {
        const response = await axiosInstance.post('api/auth/token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          error.config.headers.Authorization = `Bearer ${localStorage.getItem(
            'accessToken'
          )}`;
        }
        return axios.request(error.config);
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log('interceptor', error);
//     if (error.response.status === 401) {
//       console.log('HURRAY INTERCEPTOR TRIGGERED');

//       // try {
//       //   const response = await axiosInstance.post('api/auth/token', {
//       //     refreshToken: localStorage.getItem('refreshToken'),
//       //   });
//       //   if (response.status === 200) {
//       //     localStorage.setItem('accessToken', response.data.accessToken);
//       //     localStorage.setItem('refreshToken', response.data.refreshToken);
//       //     error.config.Authorization = response.data.accessToken;
//       //   }
//       // } catch (err) {
//       //   console.log('interceptor error', err.response);
//       // }

//       // console.log('err config', error.config);
//     }
//   }
// );

export default axiosInstance;
