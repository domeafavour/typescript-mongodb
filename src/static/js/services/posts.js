import { fetchJsonData } from './base.js';

export async function fetchPosts() {
  return fetchJsonData('/posts/list');
}

export async function fetchPostById(id) {
  return fetchJsonData(`/posts/${id}`);
}

export async function updatePost(newPost) {
  return fetchJsonData('/posts/update', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
}

export async function createPost(newPost) {
  return fetchJsonData('/posts/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
}
