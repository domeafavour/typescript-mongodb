import * as marked from 'https://cdn.bootcdn.net/ajax/libs/marked/4.0.17/lib/marked.esm.js';

/**
 * Markdown to HTML
 * @param {string} md
 * @returns {string}
 */
export function render(md) {
  return marked.parse(md);
}
