import { Main } from '../main';
import { RecentMusic } from '../pages/Recent/RecentMusicList';
import { GenreMusic } from '../pages/Genre/GenreMusicList';
import { NotFound } from '../pages/NotFound/NotFound';

// 페이지 타입
type Page = Main | RecentMusic | GenreMusic | NotFound;

export class Router {
  private routes: { [key: string]: new () => Page } = {};
  constructor() {
    this.routes = {
      '/': Main,
      '/recent': RecentMusic,
      '/genre': GenreMusic,
      '/notFound': NotFound,
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
