import { albumInfoDetail, albumInfoRes } from '../../models/RecentAlbum';
import { select, tagCreat } from '../../utils/ElementUtils';
import { RecentNusicDetailAxios } from '../../utils/MusicAxios';

import { DateUtils, DateFormat } from '../../utils/DateUtils';
const dataUtil = new DateUtils();

export class RecentMusicDetail {
  musicSelected(event: Event) {
    console.log('mesicSelected');
    let musicSelectId: string = '';
    let callUrl: string = '';
    if (event.target instanceof HTMLImageElement) {
      console.log('Img Tag Selected');
      if (event.target.parentElement) {
        musicSelectId = event.target.parentElement.parentElement?.id as string;
      }
    } else if (event.target instanceof HTMLParagraphElement) {
      console.log('P Tag Selected');
      if (event.target.parentElement) {
        musicSelectId = event.target.parentElement?.id as string;
      }
    } else if (event.target instanceof HTMLElement) {
      console.log('H3 Tag Selected');
      if (event.target.parentElement) {
        musicSelectId = event.target.parentElement?.id as string;
      }
    }

    callUrl = albumInfoUrl(musicSelectId);

    setupData(callUrl);
  }

  render(): string {
    return `
      <div x-show="isOpen" id="albumPopup" class="relative z-10" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.
    
        Entering: "ease-out duration-300"
            From: "opacity-0"
            To:   "opacity-100"
        Leaving:  "ease-in duration-200"
            From: "opacity-100"
            To:   "opacity-0"
        -->
        <div 
        x-show="isOpen"
             x-transition:enter="ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"       
             x-transition:leave="ease-in duration-200"     
             x-transition:leave-start="opacity-100"     
             x-transition:leave-end="opacity-0"     

             class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <!--
                Modal panel, show/hide based on modal state.
        
                Entering: "ease-out duration-300"
                From:     "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                To:       "opacity-100 translate-y-0 md:scale-100"
                Leaving:  "ease-in duration-200"
                From:     "opacity-100 translate-y-0 md:scale-100"
                To:       "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            -->
            <div 
            x-show="isOpen"
            x-transition:enter="ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            x-transition:enter-end="opacity-100 translate-y-0 md:scale-100"       
            x-transition:leave="ease-in duration-200"     
            x-transition:leave-start="opacity-100 translate-y-0 md:scale-100"     
            x-transition:leave-end="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        
            class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button @click="closePopup" type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
    
              <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div id="titleImg" class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 shadow-2xl sm:col-span-4 lg:col-span-5"></div>
                <div class="sm:col-span-8 lg:col-span-7">
                  <h2 id="albumType" class="text-sm font-bold text-gray-400 sm:pr-12"></h2>
                  <h2 id="albumName" class="text-2xl font-bold text-gray-900 sm:pr-12"></h2>

                  <section aria-labelledby="information-heading" class="mt-2">
                    <h3 id="information-heading" class="sr-only">Product information</h3>
                    <p id="artistName" class="text-base text-gray-900"></p>
                  </section>

                  <section aria-labelledby="options-heading" class="mt-3">
                    <h3 id="options-heading" class="sr-only">Product options</h3>
                    <form>
                      <!-- Colors -->
                      <div class="font-semibold text-sm text-slate-600 grid gap-1.5 grid-cols-2">
                        <h4 class="mr-5">발매일</h4>
                        <h4 id="releaseYmd"></h4>
                        <h4 class="mr-5">장르</h4>
                        <h4 id="genreStyle"></h4>
                        <h4 class="mr-5">기획사</h4>
                        <h4 id="labelNm"></h4>
                      </div>
                      <!-- <button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button> -->
                    </form>
                  </section>
                </div>
                <div class="sm:col-start-1 sm:col-end-12 lg:col-start-1 lg:col-end-12">
                  <!-- Sizes -->
                  <div class="mt-10">
                    <div class="flex items-center justify-between py-1">
                        <h4 class="text-base font-semibold text-gray-900">수록곡</h4>
                    </div>
                    <hr>
                    <ul role="list" class="divide-y divide-gray-100">
                      <li class="flex justify-between gap-x-6 py-1">
                        <div class="flex min-w-0 gap-x-4">
                          <div class="w-12 flex-none rounded-lg"></div>
                          <div class="min-w-0 flex-auto">
                            <p class="text-sm font-medium leading-6 text-gray-900">곡/앨범</p>
                          </div>
                        </div>
                        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p class="text-sm leading-6 text-gray-900">아티스트</p>
                        </div>
                      </li>
                    </ul>
                    <hr>
                    <ul id="albumList" role="list" class="divide-y divide-gray-100"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
}

// 선택한 사이트 URL 셋팅
function albumInfoUrl(id: string): string {
  const url: string = `https://www.music-flo.com/api/meta/v1/album/${id}/track`;
  return url;
}

// 선택 앨범 상세보기 API 호출
async function setupData(callUrl: string) {
  const { data } = await RecentNusicDetailAxios(callUrl);
  setAlbumInfo(data);
}

function setAlbumInfo(data: albumInfoRes) {
  const albumList = data.data.list;

  const titleAlbum = albumList.filter(value => value.titleYn == 'Y');
  const titleAlbumInfo = titleAlbum[0];

  // 이미지 초기화
  const titleImg = select<HTMLDivElement>('#titleImg');
  titleImg.innerHTML = '';

  const imgTag = tagCreat('img');
  const imgUrl = titleAlbumInfo.album.imgList[5].url;

  imgTag.setAttribute('class', 'object-cover object-center');
  imgTag.setAttribute('src', imgUrl);

  // 앨범 타입
  const albumType = select<HTMLElement>('#albumType');
  albumType.innerText = '[' + titleAlbumInfo.album.albumTypeStr + ']';
  // 앨범 명
  const albumName = select<HTMLElement>('#albumName');
  albumName.innerText = titleAlbumInfo.album.title;
  // 가수 명
  const artistName = select<HTMLParagraphElement>('#artistName');
  artistName.innerText = titleAlbumInfo.artistList[0].name;
  // 발매일
  const releaseYmd = select<HTMLElement>('#releaseYmd');

  releaseYmd.innerText = dataUtil.dateformat(
    titleAlbumInfo.album.releaseYmd,
    DateFormat.yyyymmdd,
  );
  // 장르
  const genreStyle = select<HTMLElement>('#genreStyle');
  genreStyle.innerText = titleAlbumInfo.album.genreStyle;
  // 기획사
  const labelNm = select<HTMLElement>('#labelNm');
  labelNm.innerText = titleAlbumInfo.album.albumLabelList[0]
    ? titleAlbumInfo.album.albumLabelList[0].labelNm
    : '-';
  // 이미지 삽입
  titleImg.appendChild(imgTag);

  albumMusicList(albumList);
}

// 앨범 수록곡 목록 출력
function albumMusicList(data: Array<albumInfoDetail>) {
  const ulTag = select('#albumList');
  // 목록 초기화
  if (ulTag.childElementCount > 0) {
    ulTag.innerText = '';
  }
  data.forEach(value => {
    const liTag = tagCreat('li');
    liTag.setAttribute('class', 'flex justify-between gap-x-6 py-5');

    const divTag01 = tagCreat('div');
    divTag01.setAttribute('class', 'flex min-w-0 gap-x-4');

    const imgTag = tagCreat('img');
    imgTag.setAttribute(
      'class',
      'h-12 w-12 flex-none rounded-lg bg-gray-50 drop-shadow-md',
    );
    imgTag.setAttribute('src', value.album.imgList[5].url);

    const divTag01_1 = tagCreat('div');
    divTag01_1.setAttribute('class', 'min-w-0 flex-auto');

    const pTag01_01 = tagCreat('p');
    pTag01_01.setAttribute(
      'class',
      'text-sm font-semibold leading-6 text-gray-900',
    );
    pTag01_01.innerText = value.name;

    const pTag01_02 = tagCreat('p');
    pTag01_02.setAttribute(
      'class',
      'mt-1 truncate text-xs leading-5 text-gray-500',
    );
    pTag01_02.innerText = value.album.title;

    divTag01_1.appendChild(pTag01_01);
    divTag01_1.appendChild(pTag01_02);
    divTag01.appendChild(imgTag);
    divTag01.appendChild(divTag01_1);
    liTag.appendChild(divTag01);

    const divTag02 = tagCreat('li');
    divTag02.setAttribute(
      'class',
      'hidden shrink-0 sm:flex sm:flex-col sm:items-end',
    );

    const pTag02_01 = tagCreat('p');
    pTag02_01.setAttribute('class', 'text-sm leading-6 text-gray-900');
    pTag02_01.innerText = value.artistList[0].name;

    const pTag02_02 = tagCreat('p');
    pTag02_02.setAttribute('class', 'mt-1 text-xs leading-5 text-gray-500');

    pTag02_02.innerText = value.playTime;

    divTag02.appendChild(pTag02_01);
    divTag02.appendChild(pTag02_02);
    liTag.appendChild(divTag02);

    ulTag.append(liTag);
  });
}
