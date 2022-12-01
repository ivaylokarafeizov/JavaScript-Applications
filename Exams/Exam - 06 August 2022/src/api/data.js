import * as api from './api.js';

const endpoints = {
  offers: '/data/offers?sortBy=_createdOn%20desc',
  offerById: '/data/offers/',
  create: '/data/offers',
  apply: '/data/applications',
  applicationsByOfferId: (offerId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
  applicationsBySpecificUser: (offerId, userId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllOffers() {
  return api.get(endpoints.offers);
}

export async function getById(offerId) {
  return api.get(endpoints.offerById + offerId);
}

export async function editById(id, offerData) {
  return api.put(endpoints.offerById + id, offerData);
}

export async function createOffer(offerData) {
  return api.post(endpoints.create, offerData);
}

export async function deleteById(offerId) {
  return api.del(endpoints.offerById + offerId);
}

export async function apply(offerId) {
  return api.post(endpoints.apply, offerId);
}

export async function getApplicationsByOfferId(offerId) {
  return api.get(endpoints.applicationsByOfferId(offerId));
}

export async function getApplicationsBySpecificUser(offerId, userId) {
  return api.get(endpoints.applicationsBySpecificUser(offerId, userId));
}
