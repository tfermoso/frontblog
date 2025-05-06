// Simula un backend usando localStorage

const USERS_KEY = 'fakeapi_users';
const POSTS_KEY = 'fakeapi_posts';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getPosts() {
  return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]');
}

function setPosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export async function fakeRegister({ username, password }) {
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return { ok: false, message: 'Usuario ya existe' };
  }
  users.push({ username, password });
  setUsers(users);
  return { ok: true };
}

export async function fakeLogin({ username, password }) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return { ok: false, message: 'Usuario o contraseña incorrectos' };
  }
  // Simula un token (no seguro, solo para demo)
  return { ok: true, token: 'fake-token', username };
}

export async function fakeGetPosts() {
  return getPosts();
}

export async function fakeGetMyPosts(username) {
  return getPosts().filter(post => post.username === username);
}

export async function fakeAddPost({ titulo, descripcion, username }) {
  const posts = getPosts();
  const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  const post = { id, titulo, descripcion, username };
  posts.push(post);
  setPosts(posts);
  return post;
}

export async function fakeEditPost({ id, titulo, descripcion, username }) {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === id && p.username === username);
  if (idx === -1) return { ok: false, message: 'No autorizado o post no existe' };
  posts[idx] = { ...posts[idx], titulo, descripcion };
  setPosts(posts);
  return { ok: true };
}

export async function fakeDeletePost({ id, username }) {
  let posts = getPosts();
  const before = posts.length;
  posts = posts.filter(p => !(p.id === id && p.username === username));
  setPosts(posts);
  return { ok: posts.length < before };
}

export async function fakeGetPostById(id) {
  return getPosts().find(p => p.id === id);
}
