import { fetchJsonData } from './base.js';
/**
 * login
 * @param {{ email: string; password: string }} values
 * @returns {Promise<{ name: string; email: string } | null>}
 */
export async function login(values) {
  const user = await fetchJsonData('/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  return user;
}

/**
 * register
 * @param {{ email: string; name: string; password: string }} values
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
 * @returns {Promise<{ name: string; email: string }>}
 */
export async function fetchCurrent() {
  return await fetchJsonData('/user/current');
}
