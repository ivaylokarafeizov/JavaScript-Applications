import { get, post } from './api.js';

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout',
};

export async function login(username, password) {
  const user = await post(endpoints.login, { username, password });
  sessionStorage.setItem('user', JSON.stringify(user));
}

export async function register(username, password) {
  const user = await post(endpoints.register, { username, password });
  sessionStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
  get(endpoints.logout);
  sessionStorage.clear();
}
