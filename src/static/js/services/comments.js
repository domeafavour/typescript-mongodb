import { fetchJsonData } from './base.js';

/**
 *
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

export async function fetchComments(postId) {
  return fetchJsonData(`/comments/list/${postId}`);
}

export async function deleteComment(commentId) {
  return fetchJsonData(`/comments/delete`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: commentId }),
  });
}
