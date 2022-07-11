import { fetchJsonData } from './base.js';

/**
 * create a comment
 * @param {{ postId: string; title: string }} values
 */
export async function createComment(values) {
  return fetchJsonData('/comments/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

/**
 * fetch comments by post's id
 * @param {string} postId
 * @returns {import('./base.js').PromiseResponse<import('./typings.js').Comment[]>}
 */
export async function fetchComments(postId) {
  return fetchJsonData(`/comments/list/${postId}`);
}

/**
 * delete a comment
 * @param {string} commentId
 * @returns {import('./base.js').PromiseResponse<import('./typings.js').Comment>}
 */
export async function deleteComment(commentId) {
  return fetchJsonData(`/comments/delete`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: commentId }),
  });
}
