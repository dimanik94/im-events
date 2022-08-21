/**
 * @param url
 * @returns JSON-объект
 */
export const fetchData = (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
  })
    .then((res) => {
      console.log("res", res);
      return res.json();
    })
    .then((res) => res);

/**
 * @param url
 * @returns JSON-объект
 */
export const postData = (url: string, body: any): Promise<any> =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res);

/**
 * @param url
 * @returns JSON-объект
 */
export const putData = (url: string): Promise<any> =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res);
