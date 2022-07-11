import { removeCurrentUser } from '../utils/user.js';

export async function fetchJsonData(url, options) {
  const res = await fetch(url, options);
  const json = await res.json();
  if (json.code === 99999) {
    removeCurrentUser();
  }
  return json.data;
}

export async function delay() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
