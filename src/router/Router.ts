import { RecentMusic } from '../pages/Recent/RecentMusicList';
import { NotFound } from '../pages/NotFound/NotFound';

// 페이지 타입
type Page = RecentMusic | NotFound;

export class Router {
  private routes: { [key: string]: new () => Page } = {};
  constructor() {
    this.routes = {
      '/': RecentMusic,
    };
  }

  navigateTo(path: string): void {
    const Component = this.routes[path] || NotFound;
    const page = new Component();
    this.renderPage(page);
  }

  renderPage(page: Page): void {
    const appDiv = document.getElementById('body');
    if (appDiv) {
      appDiv.innerHTML = page.render();
    }
  }
}

export default Router;
