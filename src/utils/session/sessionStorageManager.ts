export const getToken = (): string | null => {
  return get('token');
};

export const setToken = (token: string): void => {
  return set('token', token);
};

export const removeToken = (): void => {
  return remove('token');
};

const get = (key: string): string | null => {
  return window.sessionStorage.getItem(key);
};

const set = (key: string, value: string): void => {
  return window.sessionStorage.setItem(key, value);
};
const remove = (key: string): void => {
  return window.sessionStorage.removeItem(key);
};
