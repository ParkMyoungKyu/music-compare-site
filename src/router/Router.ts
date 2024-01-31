import { Main } from '../main';

import { Header } from '../components/Header';
import { MusicSiteList } from '../components/MusicSiteList';
import { Footer } from '../components/Footer';

import { RecentMusic } from '../pages/Recent/RecentMusicList';
import { Top100Music } from '../pages/Top100/Top100MusicList';
import { GenreMusic } from '../pages/Genre/GenreMusicList';
import { NotFound } from '../pages/NotFound/NotFound';
import { select } from '../utils/ElementUtils';

// 페이지 타입
type Page = Main | RecentMusic | Top100Music | GenreMusic | NotFound;

export class Router {
  private routes: { [key: string]: new () => Page } = {};

  constructor() {
    this.routes = {
      '/': Main,
      '/index.html': Main,
      '/recent': RecentMusic,
      '/top100': Top100Music,
      '/genre': GenreMusic,
      '/notFound': NotFound,
    };
  }

  navigateTo(path: string): void {
    const Component = this.routes[path] || NotFound;
    const page = new Component();

    this.renderPage(page, path);
  }

  // 페이지 랜더링
  renderPage(page: Page, path: string): void {
    console.log('Router Render', page, path);
    const appDiv: HTMLDivElement = select('#body');

    appDiv.innerHTML = page.render();

    this.renderEventInit(path);
  }

  // 이벤트 랜더링
  renderEventInit(path: string): void {
    if (path == '/' || path == '/index.html') {
      select('#header').innerHTML = '';
      select('#musicSiteList').innerHTML = '';
      select('#footer').innerHTML = '';
      new Main().getStart();
    } else {
      // 메인이 아닐경우 공통 컴포넌트 랜더링
      this.renderAddCommon();
    }
  }

  // Header,MusicSiteList,Footer 랜더링
  renderAddCommon(): void {
    console.log('renderAddCommon');
    const headerDiv: HTMLDivElement = select('#header');
    const musicSiteListDiv: HTMLDivElement = select('#musicSiteList');
    const footerDiv: HTMLDivElement = select('#footer');

    const header = new Header();
    const musicSiteList = new MusicSiteList(); // 초기값 설정
    const footer = new Footer();

    headerDiv.innerHTML = header.render();
    musicSiteListDiv.innerHTML = musicSiteList.render();
    footerDiv.innerHTML = footer.render();

    // 공통 컴포넌트들의 이벤트 랜더링
    header.headerMoveEvent();
    musicSiteList.musicSiteMoveEvent();
  }

  // Header,MusicSiteList,Footer 제거
  renderRemoveCommon(): void {
    const headerDiv: HTMLDivElement = select('#header');
    const musicSiteListDiv: HTMLDivElement = select('#musicSiteList');
    const footerDiv: HTMLDivElement = select('#footer');

    headerDiv.innerHTML = '';
    musicSiteListDiv.innerHTML = '';
    footerDiv.innerHTML = '';
  }

  // 공통 컴포넌트들의 이벤트 랜더링
  commonEventRender() {}
}

export default Router;
