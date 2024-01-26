import { RecentMusicPopup } from './RecentMusicDetail';
import { MusicSiteName } from './MusicSiteList';
import { MusicAxios } from './../utils/MusicAxios';
import { $ } from '../utils/ElementUtils';
import { todayAlbumRes, todayAlbumResDataList } from '../models/todayAlbum';

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
  const { data } = await MusicAxios(callUrl);
  setTodaArtistList(data);
}

// 최근 발매 앨범 데이터 셋팅
function setTodaArtistList(data: todayAlbumRes) {
  const AlbumList = data.data.list;

  AlbumList.forEach((value: todayAlbumResDataList) => {
    const todayAlbumList = $<HTMLDivElement>('.todayList');

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
    const RecentMusicPopupComponent = new RecentMusicPopup();
    return `
    <div class="bg-white" x-data="{ isPopup: false }">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>
        <div class="todayList grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8"></div>
      </div>  
      ${RecentMusicPopupComponent.render()}
    </div>`;
  }
}
