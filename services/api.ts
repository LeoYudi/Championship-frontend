async function fetch_api(method: string, route: string, body: any = undefined): Promise<any> {
  return new Promise((res, rej) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(data => res(data.json()))
      .catch(error => rej(error));
  });
}

const api = {
  get: async (route: string) => await fetch_api('GET', route),
  post: async (route: string, body: any) => await fetch_api('POST', route, body),
  delete: async (route: string) => await fetch_api('DELETE', route),
};

export default api;