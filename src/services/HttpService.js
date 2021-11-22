import axios from 'axios'
import store from '@/store';
import router from '@/router';

const baseURL = 'https://8080-gray-clownfish-mu300pja.ws-us18.gitpod.io/api'

axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = store.state.token;
  }
  return config;
})
axios.interceptors.response.use(res => {
  return res;
}, async error => {
  if (error.response.status === 403) {
    alert('Não autorizado!');
  } else if (error.response.status === 401) {
    store.commit('logout');
    await router.push('/login');
  }
  throw error;
})

const handleResponse = (response) => response && response.data;

const get = (collection) => axios.get(`${baseURL}/${collection}`).then(handleResponse);
const getById = (collection, id) => axios.get(`${baseURL}/${collection}/${id}`).then(handleResponse);
const create = (collection, data = {}) => axios.post(`${baseURL}/${collection}`, data).then(handleResponse);
const updateById = (collection, id, data = {}) => axios.post(`${baseURL}/${collection}/${id}`, data).then(handleResponse);
const deleteById = (collection, id) => axios.delete(`${baseURL}/${collection}/${id}`).then(handleResponse);

const login = ({username, password}) => axios.post(`${baseURL}/login`, {username, password})
    .then(res => {
      return {user: res.data, token: res.headers && res.headers.token}
    })

export default {
  get, getById, create, updateById, deleteById, login
}
