import * as api from './api.js';

const endpoints = {
  events: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
  eventById: '/data/theaters/',
  create: '/data/theaters',
  getByUserId: (userId) =>
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  likes: '/data/likes',
  totalLikes: (theaterId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  likesFromSpecificUser: (theaterId, userId) =>
    `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllEvents() {
  return api.get(endpoints.events);
}

export async function getEventsByUserId(userId) {
  return api.get(endpoints.getByUserId(userId));
}

export async function like(theaterId) {
  return api.post(endpoints.likes, { theaterId });
}

export async function getLikesByTheaterId(theaterId) {
  return api.get(endpoints.totalLikes(theaterId));
}

export async function getLikesFromSpecificUser(theaterId, userId) {
  return api.get(endpoints.likesFromSpecificUser(theaterId, userId));
}

export async function getById(id) {
  return api.get(endpoints.eventById + id);
}

export async function editById(id, eventData) {
  return api.put(endpoints.eventById + id, eventData);
}

export async function createEvent(eventData) {
  return api.post(endpoints.create, eventData);
}

export async function deleteById(id) {
  return api.del(endpoints.eventById + id);
}
