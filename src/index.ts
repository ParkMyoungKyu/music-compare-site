// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

import axios, { AxiosResponse } from 'axios';
import {
  albumInfoDetail,
  albumInfoRes,
  todayAlbumRes,
  todayAlbumResDataList,
} from './models/todayAlbum';

// components
import { Header } from './components/header';

// 화면에 출력하는 함수
const displayComponents = (...components: string[]): void => {
  const appDiv: HTMLElement | null = document.getElementById('body');
  if (appDiv) {
    appDiv.innerHTML = components.join('');
  }
};

// 초기 컴포넌트 표시
displayComponents(Header());

function $<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}

function tagCreat<T extends HTMLElement>(tagCreat: string) {
  const tag = document.createElement(tagCreat);
  return tag as T;
}

const todayAlbumList = $<HTMLDivElement>('.todayList');

// 오늘 발매 앨범
function todayAlbumRequest(): Promise<AxiosResponse<todayAlbumRes>> {
  const url = 'https://www.music-flo.com/api/meta/v1/album/ALL/new';
  return axios.get(url);
}

async function setupData() {
  const { data } = await todayAlbumRequest();
  setTodaArtistList(data);
}

function setTodaArtistList(data: todayAlbumRes) {
  const AlbumList = data.data.list;

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

function initEvents() {
  todayAlbumList.addEventListener('click', musicSelected);
}

async function musicSelected(event: Event) {
  let musicSelectId: string = '';
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
  }

  const { data } = await albumInfo(musicSelectId);

  albumInfoDetail(data);
}

// 오늘 발매 앨범 상세보기
function albumInfo(id: string): Promise<AxiosResponse<albumInfoRes>> {
  const albumInfoUrl = `https://www.music-flo.com/api/meta/v1/album/${id}/track`;
  return axios.get(albumInfoUrl);
}

function albumInfoDetail(data: albumInfoRes) {
  const albumList = data.data.list;
  const titleAlbum = albumList.filter(value => value.titleYn == 'Y');
  const titleAlbumInfo = titleAlbum[0];

  // 이미지 초기화
  const titleImg = $<HTMLDivElement>('#titleImg');
  titleImg.innerHTML = '';

  const imgTag = tagCreat('img');
  const imgUrl = titleAlbumInfo.album.imgList[5].url;

  imgTag.setAttribute('class', 'object-cover object-center');
  imgTag.setAttribute('src', imgUrl);

  // 앨범 타입
  const albumType = $<HTMLElement>('#albumType');
  albumType.innerText = '[' + titleAlbumInfo.album.albumTypeStr + ']';
  // 앨범 명
  const albumName = $<HTMLElement>('#albumName');
  albumName.innerText = titleAlbumInfo.album.title;
  // 가수 명
  const artistName = $<HTMLParagraphElement>('#artistName');
  artistName.innerText = titleAlbumInfo.artistList[0].name;
  // 발매일
  const releaseYmd = $<HTMLElement>('#releaseYmd');
  releaseYmd.innerText = titleAlbumInfo.album.releaseYmd;
  // 장르
  const genreStyle = $<HTMLElement>('#genreStyle');
  genreStyle.innerText = titleAlbumInfo.album.genreStyle;
  // 기획사
  const labelNm = $<HTMLElement>('#labelNm');
  labelNm.innerText = titleAlbumInfo.album.albumLabelList[0].labelNm;
  // 이미지 삽입
  titleImg.appendChild(imgTag);

  albumMusicList(albumList);
}

// 앨범 수록곡 목록 출력
function albumMusicList(data: Array<albumInfoDetail>) {
  const ulTage = $('#albumList');
  // 목록 초기화
  if (ulTage.childElementCount > 0) {
    ulTage.innerText = '';
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

    ulTage.append(liTag);
  });
}
setupData();
initEvents();
