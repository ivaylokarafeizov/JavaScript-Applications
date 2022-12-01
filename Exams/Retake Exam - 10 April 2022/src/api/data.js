import * as api from './api.js';

const endpoints = {
  posts: '/data/posts?sortBy=_createdOn%20desc',
  postById: '/data/posts/',
  create: '/data/posts',
  getPostsByUserId: (userId) =>
    `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  donate: '/data/donations',
  donationsByPostId: (postId) =>
    `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
  donationsBySpecificUser: (postId, userId) =>
    `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllPosts() {
  return api.get(endpoints.posts);
}

export async function getMyPosts(userId) {
  return api.get(endpoints.getPostsByUserId(userId));
}

export async function getById(postId) {
  return api.get(endpoints.postById + postId);
}

export async function editById(id, postData) {
  return api.put(endpoints.postById + id, postData);
}

export async function createPost(postData) {
  return api.post(endpoints.create, postData);
}

export async function deleteById(postId) {
  return api.del(endpoints.postById + postId);
}

export async function donate(postId) {
  return api.post(endpoints.donate, postId);
}

export async function getDonationsByPostId(postId) {
  return api.get(endpoints.donationsByPostId(postId));
}

export async function getDonationsBySpecificUser(postId, userId) {
  return api.get(endpoints.donationsBySpecificUser(postId, userId));
}
