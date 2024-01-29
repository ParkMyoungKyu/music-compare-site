// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

// 컴포넌트 import
import { Router } from './router/Router';
import { Header } from './components/Header';
import { MusicSiteList } from './components/MusicSiteList';
import { Footer } from './components/Footer';

// Utils import
import { select } from './utils/ElementUtils';

// 음악 사이트
import { MusicSiteName } from './components/MusicSiteList';

const appRoot = new Router();
const header = new Header();
const musicSiteList = new MusicSiteList(MusicSiteName.flo, 'ALL'); // 초기값 설정
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
  }
}

// import { Header } from './components/Header';
// import { MusicSite, MusicSiteName } from './components/MusicSiteList';
// import { RecentMusic, RecentMusicList } from './pages/Recent/RecentMusicList';

// import { MusicSelectedInfo } from './pages/Recent/RecentMusicDetail';
// import { Footer } from './components/Footer';
// import { select, selectAll } from './utils/ElementUtils';

// // 화면에 출력하는 함수
// const displayComponents = (...components: any[]): void => {
//   const appDiv: HTMLElement | null = select('#body');
//   if (appDiv) {
//     appDiv.innerHTML = '';
//     components.forEach(component => {
//       const componentInstance = new component();
//       appDiv.innerHTML += componentInstance.render();
//     });
//   }
// };

// // 초기 컴포넌트 표시
// displayComponents(Header, MusicSite, RecentMusic, Footer);

// new RecentMusicList(MusicSiteName.flo, 'ALL');

// function initEvents() {
//   const todayAlbumList = select<HTMLDivElement>('.todayList');
//   const musicSelectId = new MusicSelectedInfo();
//   todayAlbumList.onclick = musicSelectId.musicSelected;

//   const categoryBtn = selectAll<NodeListOf<HTMLButtonElement>>('.categoryBtn');
//   categoryBtn.forEach((button: HTMLButtonElement) => {
//     button.addEventListener('click', function () {
//       new RecentMusicList(MusicSiteName.flo, button.value);
//     });
//   });
// }

// initEvents();
