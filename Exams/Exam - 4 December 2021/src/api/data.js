import * as api from './api.js';

const endpoints = {
  songs: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
  songById: '/data/albums/',
  create: '/data/albums',
  getByQuery: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
};

export async function getAllSongs() {
  return api.get(endpoints.songs);
}

export async function getSongsBySearch(query) {
  return api.get(endpoints.getByQuery(query));
}

export async function getById(id) {
  return api.get(endpoints.songById + id);
}

export async function editById(id, shoesData) {
  return api.put(endpoints.songById + id, shoesData);
}

export async function createSong(songData) {
  return api.post(endpoints.create, songData);
}

export async function deleteById(id) {
  return api.del(endpoints.songById + id);
}
