// CSS imports
import '../styles/styles.css';

import App from './pages/app';

import { getAccessToken } from './utils/auth';

document.addEventListener('DOMContentLoaded', async () => {
  // Bersihkan token yang tidak valid
  const token = getAccessToken();
  if (!token || token === 'null' || token === 'undefined' || token === '') {
    localStorage.removeItem('token');
  }

  // Jika tidak ada hash dan belum login, arahkan ke #/login
  if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '') {
    const freshToken = getAccessToken();
    if (!freshToken) {
      window.location.hash = '#/login';
    }
  }

  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
