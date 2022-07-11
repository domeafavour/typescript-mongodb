/**
 * @template D
 * @typedef FetchResponse
 * @property {boolean} success
 * @property {D} data
 * @property {number} code
 * @property {string | null} message
 */

/**
 * @template D1
 * @typedef {Promise<FetchResponse<D1>>} PromiseResponse
 */

/**
 * @template T
 * @param {Parameters<typeof fetch>[0]} url
 * @param {Parameters<typeof fetch>[1]} options
 * @returns {PromiseResponse<T>}
 */
export async function fetchJsonData(url, options) {
  const res = await fetch(url, options);
  const json = await res.json();
  return { success: json.code === 200, ...json };
}

export async function delay() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
