import * as api from './api.js';

const endpoints = {
  albums: '/data/albums?sortBy=_createdOn%20desc',
  albumById: '/data/albums/',
  create: '/data/albums',
  likes: '/data/likes',
  totalLikes: (albumId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
  likesFromSpecificUser: (albumId, userId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllAlbums() {
  return api.get(endpoints.albums);
}

export async function like(albumId) {
  return api.post(endpoints.likes, { albumId });
}

export async function getLikesByAlbumId(albumId) {
  return api.get(endpoints.totalLikes(albumId));
}

export async function getLikesFromSpecificUser(albumId, userId) {
  return api.get(endpoints.likesFromSpecificUser(albumId, userId));
}

export async function getById(id) {
  return api.get(endpoints.albumById + id);
}

export async function editById(id, albumData) {
  return api.put(endpoints.albumById + id, albumData);
}

export async function createAlbum(albumData) {
  return api.post(endpoints.create, albumData);
}

export async function deleteById(id) {
  return api.del(endpoints.albumById + id);
}
