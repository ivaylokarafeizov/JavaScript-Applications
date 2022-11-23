import * as api from './api.js';

const endpoints = {
  books: '/data/books?sortBy=_createdOn%20desc',
  bookById: '/data/books/',
  bookByUserId: (userId) =>
    `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  create: '/data/books',
  likes: '/data/likes',
  totalLikes: (bookId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
  likesFromSpecificUser: (bookId, userId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllBooks() {
  return api.get(endpoints.books);
}

export async function getMyBooks(userId) {
  return api.get(endpoints.bookByUserId(userId));
}

export async function getById(id) {
  return api.get(endpoints.bookById + id);
}

export async function editById(id, bookData) {
  return api.put(endpoints.bookById + id, bookData);
}

export async function createBook(bookData) {
  return api.post(endpoints.create, bookData);
}

export async function likeBook(bookId) {
  return api.post(endpoints.likes, bookId);
}

export async function getLikesByBookId(bookId) {
  return api.get(endpoints.totalLikes(bookId));
}

export async function getLikesFromSpecificUser(bookId, userId) {
  return api.get(endpoints.likesFromSpecificUser(bookId, userId));
}

export async function deleteById(id) {
  return api.del(endpoints.bookById + id);
}
