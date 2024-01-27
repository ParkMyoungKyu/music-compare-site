// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

// components

import { Header } from './components/Header';
import { MusicSite, MusicSiteName } from './components/MusicSiteList';
import { RecentMusic, RecentMusicList } from './components/RecentMusicList';

import { MusicSelectedInfo } from './components/RecentMusicDetail';
import { Footer } from './components/Footer';
import { $, selectAll } from './utils/ElementUtils';

// 화면에 출력하는 함수
const displayComponents = (...components: string[]): void => {
  const appDiv: HTMLElement | null = $('#body');
  console.log(appDiv);

  if (appDiv) {
    appDiv.removeChild;
    appDiv.innerHTML = components.join('');
  }
};
const RecentMusicInfo = new RecentMusic();

const Bottom = new Footer();
// 초기 컴포넌트 표시
displayComponents(
  Header(),
  MusicSite(),
  RecentMusicInfo.render(),
  Bottom.render(),
);

new RecentMusicList(MusicSiteName.flo, 'KPOP');

function initEvents() {
  const todayAlbumList = $<HTMLDivElement>('.todayList');
  const musicSelectId = new MusicSelectedInfo();
  todayAlbumList.onclick = musicSelectId.musicSelected;

  const categoryBtn = selectAll<NodeListOf<HTMLButtonElement>>('.categoryBtn');

  categoryBtn.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', function () {
      console.log(button.value);
      button.setAttribute(
        'class',
        'text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800',
      );
      new RecentMusicList(MusicSiteName.flo, button.value);
    });
  });
}

initEvents();
