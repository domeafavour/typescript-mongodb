export async function fetchJsonData(url, options) {
  const res = await fetch(url, options);
  const json = await res.json();
  return json.data;
}

export async function delay() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
