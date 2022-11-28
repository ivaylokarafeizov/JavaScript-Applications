import * as api from './api.js';

const endpoints = {
  pets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
  petById: '/data/pets/',
  create: '/data/pets',
  donate: '/data/donation',
  donationsByPetId: (petId) =>
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  donationsBySpecificUser: (petId, userId) =>
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllPets() {
  return api.get(endpoints.pets);
}

export async function getById(petId) {
  return api.get(endpoints.petById + petId);
}

export async function editById(id, petData) {
  return api.put(endpoints.petById + id, petData);
}

export async function createPet(petData) {
  return api.post(endpoints.create, petData);
}

export async function deleteById(petId) {
  return api.del(endpoints.petById + petId);
}

export async function donate(petId) {
  return api.post(endpoints.donate, petId);
}

export async function getDonationsByPetId(petId) {
  return api.get(endpoints.donationsByPetId(petId));
}

export async function getDonationsFromSpecificUser(petId, userId) {
  return api.get(endpoints.donationsBySpecificUser(petId, userId));
}
