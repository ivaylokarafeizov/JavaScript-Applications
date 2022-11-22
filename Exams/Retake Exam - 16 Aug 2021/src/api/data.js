import * as api from './api.js';

const endpoints = {
  games: '/data/games?sortBy=_createdOn%20desc',
  newGames: '/data/games?sortBy=_createdOn%20desc&distinct=category',
  gameById: '/data/games/',
  create: '/data/games',
  byIdComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
  comments: '/data/comments',
};

export async function getAllGames() {
  return api.get(endpoints.games);
}

export async function getComments(gameId) {
  return api.get(endpoints.byIdComments(gameId));
}

export async function getNewGames() {
  return api.get(endpoints.newGames);
}

export async function getById(id) {
  return api.get(endpoints.gameById + id);
}

export async function editById(id, gameData) {
  return api.put(endpoints.gameById + id, gameData);
}

export async function createGame(gameData) {
  return api.post(endpoints.create, gameData);
}

export async function postComment(commentData) {
  return api.post(endpoints.comments, commentData);
}

export async function deleteById(id) {
  return api.del(endpoints.gameById + id);
}
