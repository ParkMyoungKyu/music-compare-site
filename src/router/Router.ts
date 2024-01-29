import { RecentMusic } from '../pages/Recent/RecentMusicList';
import { NotFound } from '../pages/NotFound/NotFound';
type Page = RecentMusic | NotFound;

class Router {
  private routes: { [key: string]: new () => Page } = {};
  constructor() {
    this.routes = {
      '/recent': RecentMusic,
    };
  }

  navigateTo(path: string): void {
    const Component = this.routes[path] || NotFound;
    const page = new Component();
    this.renderPage(page);
  }

  renderPage(page: Page): void {
    const appDiv = document.getElementById('app');
    if (appDiv) {
      appDiv.innerHTML = page.render();
    }
  }
}

const router = new Router();

window.addEventListener('load', () => {
  router.navigateTo(window.location.pathname);
});

window.addEventListener('popstate', () => {
  router.navigateTo(window.location.pathname);
});

export default router;
