const API_BASE = import.meta.env.VITE_BASE_URL;

export function apiUrl(path) {
  return API_BASE.replace(/\/$/, '') + path;
}

export function authHeaders() {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
