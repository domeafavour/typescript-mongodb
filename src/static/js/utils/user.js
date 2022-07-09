/**
 * @typedef User
 * @property {string} name
 * @property {string} email
 */

/**
 * Remove current user from localStorage
 */
export function removeCurrentUser() {
  localStorage.removeItem('currentUser');
}

/**
 * Save current user into localStorage
 * @param {User} user
 */
export function saveCurrentUser(user) {
  localStorage.setItem(JSON.stringify(user));
}

/**
 * Get current user from localStorage
 * @returns {User | null}
 */
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch (error) {
    return null;
  }
}

export function hasCurrentUser() {
  return !!localStorage.getItem('currentUser');
}
