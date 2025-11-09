const API_BASE = 'https://webtracker-backend.vercel.app';

export function apiUrl(path) {
  return API_BASE.replace(/\/$/, '') + path;
}

export function authHeaders() {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
