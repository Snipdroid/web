export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const fetcher = (url: string) =>
  fetch(`${SERVER_BASE_URL}/api${url}`).then((r) => r.json());
