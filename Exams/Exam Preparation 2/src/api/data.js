import * as api from './api.js';

const endpoints = {
  cars: '/data/cars?sortBy=_createdOn%20desc',
  carById: '/data/cars/',
  create: '/data/cars',
  carsByUserId: (userId) =>
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  carsByYear: (year) => `/data/cars?where=year%3D${year}`,
};

export async function getAllCars() {
  return api.get(endpoints.cars);
}

export async function getMyCars(userId) {
  return api.get(endpoints.carsByUserId(userId));
}

export async function getCarsBySearch(year) {
  return api.get(endpoints.carsByYear(year));
}

export async function getById(carId) {
  return api.get(endpoints.carById + carId);
}

export async function editById(id, carData) {
  return api.put(endpoints.carById + id, carData);
}

export async function createCar(carData) {
  return api.post(endpoints.create, carData);
}

export async function deleteById(carId) {
  return api.del(endpoints.carById + carId);
}
