import { RecentMusicDetail } from './RecentMusicDetail';
import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { RecentAlbumAxios } from '../../utils/MusicAxios';
import { select, selectAll } from '../../utils/ElementUtils';
import {
  recentAlbumResData,
  recentAlbumResDataList,
} from '../../models/RecentAlbum';

import Alpine from 'alpinejs';

Alpine.data('changePopup', () => ({
  isOpen: false,
  openPopup() {
    this.isOpen = true;
  },

  closePopup() {
    this.isOpen = false;
  },
}));

export class RecentMusic {
  musicSite: MusicSiteList = new MusicSiteList();

  recentMusicInit(chartGbn: string) {
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();
    this.log('recentMusicInit ' + thisMusicSite);

    let callUrl: string = ''; // axios 호출 url

    callUrl = this.FloecentUrl(chartGbn);
    if (thisMusicSite === MusicSiteName.melon) {
      this.log('melon Start');
    } else if (thisMusicSite === MusicSiteName.genie) {
      this.log('genie Start');
    } else if (thisMusicSite === MusicSiteName.flo) {
      this.log('flo Start');
      callUrl = this.FloecentUrl(chartGbn);
    } else if (thisMusicSite === MusicSiteName.vibe) {
      this.log('vibe Start');
      callUrl = this.VibeRecentUrl(chartGbn);
    } else if (thisMusicSite === MusicSiteName.bugs) {
      this.log('bugs Start');
    }

    this.setupData(callUrl);
  }

  // 전체,국내,해외 차트에 따른 URL 값 셋팅
  FloecentUrl(gubun: string): string {
    let url: string = '';
    if (gubun == 'ALL') {
      url = 'https://www.music-flo.com/api/meta/v1/album/ALL/new';
    } else if (gubun === 'KPOP') {
      url = 'https://www.music-flo.com/api/meta/v1/album/KPOP/new';
    } else if (gubun === 'POP') {
      url = 'https://www.music-flo.com/api/meta/v1/album/POP/new';
    }
    return url;
  }

  // 전체,국내,해외 차트에 따른 URL 값 셋팅
  VibeRecentUrl(gubun: string): string {
    let url: string = '';
    if (gubun == 'ALL') {
      url =
        'https://apis.naver.com/vibeWeb/musicapiweb/chart/domain/MANUAL/newrelease/albumChart';
    } else if (gubun === 'KPOP') {
      url =
        'https://apis.naver.com/vibeWeb/musicapiweb/chart/domain/DOMESTIC/newrelease/albumChart';
    } else if (gubun === 'POP') {
      url =
        'https://apis.naver.com/vibeWeb/musicapiweb/chart/domain/OVERSEA/newrelease/albumChart';
    }

    return url + '?start=1&display=50';
  }

  // 최근 발매 앨범 API 호출
  async setupData(callUrl: string) {
    const { data } = await RecentAlbumAxios(callUrl);
    this.setRecentAlbumList(data);
  }

  // 최근 발매 앨범 데이터 셋팅
  setRecentAlbumList(data: recentAlbumResData) {
    this.log('setRecentAlbumList');
    const AlbumList = data.data.list;

    const recentAlbumList = select<HTMLDivElement>('.recentList');
    recentAlbumList.innerHTML = ''; // 화면 초기화

    // 버튼 이벤트 생성
    const recentMusicDetail = new RecentMusicDetail();
    recentAlbumList.onclick = recentMusicDetail.musicSelected;

    AlbumList.forEach((value: recentAlbumResDataList) => {
      const tagMore = `
        <div @click="openPopup" class="group" id="${value.id.toString()}" style="cursor:pointer">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img  class="h-full w-full object-cover object-center group-hover:opacity-75 drop-shadow-xl" src="${value.imgList[5].url}">
          </div>
          <h3 class="mt-4 text-sm text-gray-700">${value.title}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">${value.artistList[0].name}</p>
        </div>
      `;
      recentAlbumList.innerHTML += tagMore;
    });
  }

  render(): string {
    this.recentMusicInit('ALL'); // 초기값 설정
    this.log('render ' + this.musicSite);
    const RecentMusicDetailComponent = new RecentMusicDetail();

    return `
    <div class="flex items-center justify-center py-1 md:py-1 flex-wrap">
      <button type="button" value="ALL"  class="categoryBtn text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">ALL</button>
      <button type="button" value="KPOP" class="categoryBtn text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">K-POP</button>
      <button type="button" value="POP"  class="categoryBtn text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">POP</button>
    </div>
    <div class="bg-white" x-data="changePopup">
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Recent Music</h2>
        <div class="recentList grid grid-cols-5 gap-x-6 gap-y-10 sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8">
        
        </div>
      </div>  
      ${RecentMusicDetailComponent.render()}
    </div>`;
  }

  // 카테고리 이동
  categoryMoveEvent() {
    const categoryBtn =
      selectAll<NodeListOf<HTMLButtonElement>>('.categoryBtn');
    categoryBtn.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        this.log('categoryMoveEvent ');
        this.recentMusicInit(button.value);
      });
    });
  }

  log(funcionName: string) {
    console.log('[RecentMusic] ' + funcionName);
  }
}
