// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

// 컴포넌트 import
import { Router } from './router/Router';
import { Main } from './main';
import { Header } from './components/Header';
import { MusicSiteList } from './components/MusicSiteList';
import { Footer } from './components/Footer';

// Utils import
import { select } from './utils/ElementUtils';

// 음악 사이트
import { MusicSiteName } from './components/MusicSiteList';

const appRoot = new Router();
const goStart = new Main();
const header = new Header();
const musicSiteList = new MusicSiteList('ALL', MusicSiteName.flo); // 초기값 설정
const footer = new Footer();

// 초기 페이지 로딩시 라우터에 따른 페이지, header,footer 랜더링
window.addEventListener('load', () => {
  appRoot.navigateTo(window.location.pathname);
  renderHeaderAndFooter();
});

// 뒤로가기, 앞으로가기 제어
window.addEventListener('popstate', () => {
  appRoot.navigateTo(window.location.pathname);
  renderHeaderAndFooter();
});

// Header,Footer 랜더링
function renderHeaderAndFooter(): void {
  const headerDiv: HTMLDivElement = select('#header');
  const musicSiteListDiv: HTMLDivElement = select('#musicSiteList');
  const footerDiv: HTMLDivElement = select('#footer');

  if (headerDiv && footerDiv) {
    headerDiv.innerHTML = header.render();
    musicSiteListDiv.innerHTML = musicSiteList.render();
    footerDiv.innerHTML = footer.render();

    initEventRender();
  }
}

// 화면에 랜더링 이후 이벤트 랜더링 진행
function initEventRender() {
  goStart.getStart();
  header.headerMoveEvent();
  musicSiteList.musicSiteMoveEvent();
  // musicSiteList.categoryMoveEvent();
}
