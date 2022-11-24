import * as api from './api.js';

const endpoints = {
  shoes: '/data/shoes?sortBy=_createdOn%20desc',
  shoesById: '/data/shoes/',
  create: '/data/shoes',
  getByQuery: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`,
};

export async function getAllShoes() {
  return api.get(endpoints.shoes);
}

export async function getShoesBySearch(query) {
  return api.get(endpoints.getByQuery(query));
}

export async function getById(id) {
  return api.get(endpoints.shoesById + id);
}

export async function editById(id, shoesData) {
  return api.put(endpoints.shoesById + id, shoesData);
}

export async function createShoes(shoesData) {
  return api.post(endpoints.create, shoesData);
}

export async function deleteById(id) {
  return api.del(endpoints.shoesById + id);
}
