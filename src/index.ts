// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

// components
import { Header } from './components/Header';
import { MusicSite, MusicSiteName } from './components/MusicSiteList';
import { RecentMusic, RecentMusicList } from './pages/Recent/RecentMusicList';

import { MusicSelectedInfo } from './pages/Recent/RecentMusicDetail';
import { Footer } from './components/Footer';
import { select, selectAll } from './utils/ElementUtils';

// 화면에 출력하는 함수
const displayComponents = (...components: any[]): void => {
  const appDiv: HTMLElement | null = select('#body');
  if (appDiv) {
    appDiv.innerHTML = '';
    components.forEach(component => {
      const componentInstance = new component();
      appDiv.innerHTML += componentInstance.render();
    });
  }
};

// 초기 컴포넌트 표시
displayComponents(Header, MusicSite, RecentMusic, Footer);

new RecentMusicList(MusicSiteName.flo, 'ALL');

function initEvents() {
  const todayAlbumList = select<HTMLDivElement>('.todayList');
  const musicSelectId = new MusicSelectedInfo();
  todayAlbumList.onclick = musicSelectId.musicSelected;

  const categoryBtn = selectAll<NodeListOf<HTMLButtonElement>>('.categoryBtn');
  categoryBtn.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', function () {
      new RecentMusicList(MusicSiteName.flo, button.value);
    });
  });
}

initEvents();
