import { fetchJsonData } from './base.js';

/**
 * @typedef {import('./typings.js').User} User
 */

/**
 * login
 * @param {Omit<User, 'id'>} values
 * @returns {import('./base.js').PromiseResponse<User>}
 */
export async function login(values) {
  return fetchJsonData('/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

/**
 * register
 * @param {Omit<User, 'id'> & { password: string }} values
 * @returns {Promise<boolean>}
 */
export async function register(values) {
  const status = await fetchJsonData('/user/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  return status === 'SUCCESS';
}

/**
 * fetch current login user
 * @returns {import('./base.js').PromiseResponse<User>}
 */
export async function fetchCurrent() {
  return await fetchJsonData('/user/current');
}
