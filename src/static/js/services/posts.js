import { fetchJsonData } from './base.js';

/**
 * fetch all posts
 * @returns {Promise<import('./base.js').FetchResponse<import('./typings.js').Post[]>>}
 */
export async function fetchPosts() {
  return fetchJsonData('/posts/list');
}

/**
 * fetch post by post id
 * @param {string} id 
 * @returns {import('./base.js').PromiseResponse<import('./typings.js').Post>}
 */
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
