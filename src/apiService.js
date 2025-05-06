// Centraliza todas las llamadas a la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apiblog-1-v1ap.onrender.com/api';

export async function apiLogin(data) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res;
}

export async function apiRegister(data) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res;
}

export async function apiGetMyPosts(token) {
  const res = await fetch(`${API_BASE_URL}/posts/my/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res;
}

export async function apiDeletePost(id, token) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res;
}

export async function apiAddPost(data, token) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res;
}

export async function apiGetPostById(id, token) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res;
}

export async function apiEditPost(id, data, token) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res;
}
