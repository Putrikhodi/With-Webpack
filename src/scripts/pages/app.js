import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      })
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const routeHandler = routes[url];
    const page = typeof routeHandler === 'function' ? routeHandler() : routeHandler;

    console.log('[ROUTING]', { url, routeHandler, page });

    if (!page) {
      this.#content.innerHTML = "<div style='color:red;text-align:center;padding:2em'>Halaman tidak ditemukan: " + url + "</div>";
      return;
    }

    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
