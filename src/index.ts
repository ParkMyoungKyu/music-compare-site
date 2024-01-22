// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

import axios, { AxiosResponse } from 'axios';
import {
  albumInfoRes,
  todayAlbumRes,
  todayAlbumResDataList,
} from './models/todayAlbum';

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
    // aTag.setAttribute('href', '#');
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
      'h-full w-full object-cover object-center group-hover:opacity-75',
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
  // document.addEventListener('alpine:init', () => {
  //   Alpine.data('modal', () => ({
  //     open: false,

  //     toggle() {
  //       this.open = !this.open;
  //     },
  //   }));
  // });
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
  console.log(titleAlbumInfo);
  // 이미지 초기화
  const titleImg = $<HTMLDivElement>('#titleImg');
  titleImg.innerHTML = '';

  const imgTag = tagCreat('img');
  const imgUrl = titleAlbumInfo.album.imgList[5].url;

  imgTag.setAttribute('class', 'object-cover object-center');
  imgTag.setAttribute('src', imgUrl);

  // 앨범 명
  const albumName = $('#albumName');
  albumName.innerText = titleAlbumInfo.name;

  // 가수 명
  const artistName = $<HTMLParagraphElement>('#artistName');
  artistName.innerText = titleAlbumInfo.artistList[0].name;

  // 이미지 삽입
  titleImg.appendChild(imgTag);
}
setupData();
initEvents();
