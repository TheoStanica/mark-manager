// import axios from 'axios';
// import { logoutUser, setUserTokens } from '../redux/actions/userActions';
// import { store } from '../redux/store';

// const setAuthHeaderValue = () => {
//   return `Bearer ${store.getState().userReducer.present.accessToken}`;
// };

// const axiosInstance = axios.create({
//   baseURL: 'https://mark.dev/',
//   headers: {
//     'Content-Type': 'Application/json',
//     Authorization: setAuthHeaderValue(),
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (store.getState().userReducer.present.accessToken)
//       config.headers.Authorization = setAuthHeaderValue();
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve();
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers['Authorization'] = 'Bearer ' + token;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         axiosInstance
//           .post('api/auth/token', {
//             refreshToken: store.getState().userReducer.present.refreshToken,
//           })
//           .then(async ({ data }) => {
//             await store.dispatch(
//               setUserTokens({
//                 accessToken: data.accessToken,
//                 refreshToken: data.refreshToken,
//               })
//             );
//             originalRequest.headers['Authorization'] =
//               'Bearer ' + data.accessToken;
//             processQueue(null, data.refreshToken);
//             resolve(axiosInstance(originalRequest));
//           })
//           .catch(async (err) => {
//             await store.dispatch(logoutUser());
//             processQueue(err, null);
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
