import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { ArtistInfo } from '../../components/ArtistInfo';

import {
  genreAlbumResData,
  genreAlbumResDataList,
  genreList,
  genreListInfo,
} from '../../models/GenreList';
import { select, tagCreat } from '../../utils/ElementUtils';
import { GenreAlbumListAxios, GenreListAxios } from '../../utils/MusicAxios';

import Alpine from 'alpinejs';
Alpine.data('artistInfo', val => ({
  openPopup: false,
  value: val,
  artistInfoOpen(v: number) {
    new ArtistInfo(v);
  },
  artistInfoClose() {},
}));

export class GenreMusic {
  musicSite: MusicSiteList = new MusicSiteList();
  static thisGenre: number = 3550;
  static musicView: number = 20; // 처음 보여줄 리스트 갯수
  genreMusicInit() {
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();

    let callUrl: string = ''; // axios 호출 url

    callUrl = `https://www.music-flo.com/api/personal/v1/preferences/genres`;
    if (thisMusicSite === MusicSiteName.Melon) {
      this.logText('melon Start');
    } else if (thisMusicSite === MusicSiteName.Genie) {
      this.logText('genie Start');
    } else if (thisMusicSite === MusicSiteName.FLO) {
      this.logText('flo Start');
    } else if (thisMusicSite === MusicSiteName.Vibe) {
      this.logText('vibe Start');
    } else if (thisMusicSite === MusicSiteName.Bugs) {
      this.logText('bugs Start');
    }

    this.setupData(callUrl);
  }

  // 장르 목록 API 호출
  async setupData(callUrl: string) {
    const { data: genreList } = await GenreListAxios(callUrl);
    this.setTop100AlbumList(genreList);

    this.genreAlbumList(GenreMusic.thisGenre);
  }

  // 장르 목록 데이터 셋팅
  setTop100AlbumList(data: genreList) {
    console.log(data);
    const GenreList = data.data.list;

    const divTag = select<HTMLDivElement>('#generList');

    GenreList.forEach((value: genreListInfo) => {
      const aTag = tagCreat('a');

      aTag.innerHTML = `
          <button id="${value.id}" class="group">
            <div class="w-full overflow-hidden rounded-lg bg-gray-200">
              <img src="${value.imgList[0].url}" class="h-full w-full object-cover object-center group-hover:opacity-75" width="158" height="48">
            </div>
          </button>
          `;

      aTag.addEventListener('click', () => {
        GenreMusic.musicView = 20;
        GenreMusic.thisGenre = value.id;
        this.genreAlbumList(value.id);
      });

      divTag.appendChild(aTag);
    });
  }

  render(): string {
    this.genreMusicInit();
    this.logText('render');
    return `
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">GenreMusic</h2>
        <div id="generList" class="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10 gap-x-6 gap-y-10 xl:gap-x-8">

        </div>
      </div>
    </div>
    <div x-data="artistInfo" class="divide-y divide-gray-100 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
      <h4 id="GenreTitle" class="text-center mb-8 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"></h1>
      <ul id="GenreAlbumList" role="list" >
      
      </ul>
      <div class="my-8 flex flex-wrap justify-center gap-4">
        <button id="moreGenreList" class="inline-block w-64 rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-red-600">
          더보기
        </button>
      </div>
    </div>
  `;
  }

  // 더보기
  moreGenreList() {
    this.logText('moreGenreList');
    const moreBtn = select('#moreGenreList');

    moreBtn.addEventListener('click', () => {
      if (GenreMusic.musicView === 100) {
        select('.moreOverAlert').setAttribute('x-show', 'true');
      } else {
        GenreMusic.musicView += 20;
        this.genreAlbumList(GenreMusic.thisGenre);
      }
    });
  }

  // 장르 목록 리스트 API 호출
  async genreAlbumList(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/chart/track/${id}?size=${GenreMusic.musicView}`;
    const { data } = await GenreAlbumListAxios(callUrl);
    this.setupListData(data);
  }

  setupListData(data: genreAlbumResData) {
    console.log(data);
    const genreAlbum = data.data.trackList;
    const genreTitle = data.data.name;
    const ulTag = select<HTMLUListElement>('#GenreAlbumList');
    ulTag.innerText = '';

    const h2Tag = select<HTMLHtmlElement>('#GenreTitle');
    h2Tag.innerText = genreTitle;

    genreAlbum.forEach((value: genreAlbumResDataList, index: number) => {
      const liTag = tagCreat('li');
      liTag.setAttribute(
        'class',
        'flex flex-col p-4 mb-1 bg-gray-800 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105',
      );
      liTag.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex flex-col ml-3 min-w-0">
                <div class="flex">
                  <h5 class="flex items-center font-medium text-gray-300 mr-6">
                  ${index + 1}
                  </h5>
                </div>
              </div>
              <div class="flex items-center mr-auto">
                <div class="inline-flex w-12 h-12">
                  <img src="${value.album.imgList[5].url}" alt="aji" class=" relative p-1 w-12 h-12 object-cover rounded-2xl"><span class="absolute w-12 h-12 inline-flex border-2 rounded-2xl border-gray-600 opacity-75">
                  <span></span>
                </div>
          
                <div class="flex flex-col ml-3 min-w-0">
                  <div class="font-medium leading-none text-gray-100">${value.name}</div>
                  <p class="text-sm text-gray-500 leading-none mt-1 truncate">${value.album.title}</p>
                </div>
              </div>  
              <div class="flex flex-col ml-3 min-w-0">
                <div class="flex">
                  <h5 @click="artistInfoOpen(${value.artistList[0].id})" class="flex items-center font-medium text-gray-300 mr-2">
                     ${value.artistList[0].name}
                  </h5>
                  <div class="flex">
                    <a class="flex-no-shrink text-xs  font-medium tracking-wider  text-green-400 hover:text-green-700 transition ease-in duration-300 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/>
                      </svg>
                    </a>
                    <a class="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
      ulTag.appendChild(liTag);
    });
  }

  logText(funcionName: string) {
    console.log('[GenreMusic]', funcionName);
  }
}
