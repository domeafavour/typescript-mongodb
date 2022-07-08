export async function fetchJsonData(url, options) {
  const res = await fetch(url, options);
  const json = await res.json();
  return json.data;
}
