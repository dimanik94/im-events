/**
 * @param url
 * @returns JSON-объект
 */
export const fetchData = (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res);
