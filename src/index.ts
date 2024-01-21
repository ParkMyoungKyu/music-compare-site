// tailwind import
import './styles/tailwind.css';

import axios, { AxiosResponse } from 'axios';
import { todayMusicRes, todayMusicResDataList } from './music';

function $<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}

const todayList = $<HTMLDivElement>('.todayList');

// 오늘 발매 음악
function todayMusicRequest(): Promise<AxiosResponse<todayMusicRes>> {
  const url = 'https://www.music-flo.com/api/meta/v1/album/ALL/new';
  return axios.get(url);
}

async function setupData() {
  const { data } = await todayMusicRequest();
  setTodaArtistList(data);
}

function setTodaArtistList(data: todayMusicRes) {
  const musicList = data.data.list;
  console.log(musicList);
  musicList.forEach((value: todayMusicResDataList) => {
    const aTag = document.createElement('a');
    aTag.setAttribute('href', '#');
    aTag.setAttribute('class', 'group');

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

    todayList.appendChild(aTag);
  });
}

function initEvents() {
  todayList.addEventListener('click', musicSelected);
}

function musicSelected(event: Event) {
  console.log(event.target);
}
setupData();
initEvents();
