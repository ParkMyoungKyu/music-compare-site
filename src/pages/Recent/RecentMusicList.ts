import { MusicSelectedInfo, RecentMusicPopup } from './RecentMusicDetail';
import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { RecentAlbumAxios } from '../../utils/MusicAxios';
import { select, selectAll } from '../../utils/ElementUtils';
import { todayAlbumRes, todayAlbumResDataList } from '../../models/todayAlbum';

export class RecentMusicList {
  musicSite: MusicSiteName;
  chartGbn: string;

  constructor(musicSite: MusicSiteName, chartGbn: string) {
    this.musicSite = musicSite;
    this.chartGbn = chartGbn;

    let callUrl: string = ''; // axios 호출 url

    if (musicSite === MusicSiteName.melon) {
      console.log('melon Start');
    } else if (musicSite === MusicSiteName.genie) {
      console.log('genie Start');
    } else if (musicSite === MusicSiteName.flo) {
      console.log('flo Start');
    } else if (musicSite === MusicSiteName.vibe) {
      console.log('vibe Start');
    } else if (musicSite === MusicSiteName.bugs) {
      console.log('bugs Start');
    }

    callUrl = chartGbnUrl(chartGbn);

    setupData(callUrl);
  }
}

// 전체,국내,해외 차트에 따른 URL 값 셋팅
function chartGbnUrl(gubun: string): string {
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

// 최근 발매 앨범 API 호출
async function setupData(callUrl: string) {
  const { data } = await RecentAlbumAxios(callUrl);
  setRecentAlbumList(data);
}

// 최근 발매 앨범 데이터 셋팅
function setRecentAlbumList(data: todayAlbumRes) {
  const AlbumList = data.data.list;

  const todayAlbumList = select<HTMLDivElement>('.todayList');
  todayAlbumList.innerHTML = ''; // 화면 초기화

  // 버튼 이벤트 생성
  const musicSelectedInfo = new MusicSelectedInfo();
  todayAlbumList.onclick = musicSelectedInfo.musicSelected;

  AlbumList.forEach((value: todayAlbumResDataList) => {
    const aTag = document.createElement('div');
    aTag.setAttribute('style', 'cursor:pointer');
    aTag.setAttribute('class', 'group');
    aTag.setAttribute('id', value.id.toString());

    const divTag = document.createElement('div');
    divTag.setAttribute(
      'class',
      'aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7',
    );

    const imgTag = document.createElement('img');
    imgTag.setAttribute(
      'class',
      'h-full w-full object-cover object-center group-hover:opacity-75 drop-shadow-xl',
    );
    imgTag.setAttribute('src', value.imgList[5].url);
    imgTag.setAttribute('x-on:click', 'isPopup = true');
    divTag.appendChild(imgTag);

    const h3Tag = document.createElement('h3');
    h3Tag.setAttribute('class', 'mt-4 text-sm text-gray-700');
    h3Tag.textContent = value.title;

    const pTag = document.createElement('p');
    pTag.setAttribute('class', 'mt-1 text-lg font-medium text-gray-900');
    pTag.textContent = value.artistList[0].name;

    aTag.appendChild(divTag);
    aTag.appendChild(h3Tag);
    aTag.appendChild(pTag);

    todayAlbumList.appendChild(aTag);
  });
}

export class RecentMusic {
  render(): string {
    new MusicSiteList('ALL', MusicSiteName.flo); // 초기값 설정
    const RecentMusicPopupComponent = new RecentMusicPopup();
    return `
    <div class="flex items-center justify-center py-1 md:py-1 flex-wrap">
      <button type="button" value="ALL"  class="categoryBtn py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ALL</button>
      <button type="button" value="KPOP" class="categoryBtn py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">K-POP</button>
      <button type="button" value="POP"  class="categoryBtn py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">POP</button>
    </div>
    <div class="bg-white" x-data="{ isPopup: false }">
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>
        <div class="todayList grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8"></div>
      </div>  
      ${RecentMusicPopupComponent.render()}
    </div>`;
  }

  // 카테고리 이동
  categoryMoveEvent() {
    const categoryBtn =
      selectAll<NodeListOf<HTMLButtonElement>>('.categoryBtn');
    categoryBtn.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        // new MusicSiteList(button.value);
      });
    });
  }
}
