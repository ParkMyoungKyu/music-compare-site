import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { select, tagCreat } from '../../utils/ElementUtils';
import { Top100AlbumAxios, Top100CategoryAxios } from '../../utils/MusicAxios';

import {
  top100AlbumResData,
  top100AlbumResDataList,
  top100Category,
} from '../../models/Top100Album';

export class Top100Music {
  musicSite: MusicSiteList = new MusicSiteList();
  static musicCategory: number = 1; // 카테고리 id
  musicView: number = 20; // 처음 보여줄 리스트 갯수

  top100MusicInit(): void {
    this.logText('top100MusicInit');
    console.log(Top100Music.musicCategory);
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();
    const thisCategory: number = Top100Music.musicCategory;

    let callUrl: string = ''; // axios 호출 url

    callUrl = `https://www.music-flo.com/api/display/v1/browser/chart/${thisCategory}/track/list?size=${this.musicView}`;
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

  // Top100 앨범 API 호출
  async setupData(callUrl: string) {
    const { data: albumList } = await Top100AlbumAxios(callUrl);
    const { data: category } = await Top100CategoryAxios(
      'https://www.music-flo.com/api/display/v1/browser/chart/menu/list',
    );

    this.setTop100AlbumList(albumList);
    this.setTop100Category(category);
  }

  // Top100 앨범 데이터 셋팅
  setTop100AlbumList(data: top100AlbumResData) {
    this.logText('setTop100AlbumList');

    const Top100List = data.data.trackList;

    const ulTag = select<HTMLUListElement>('#Top100List');
    ulTag.innerText = '';

    Top100List.forEach((value: top100AlbumResDataList, index: number) => {
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
                  <h5 class="flex items-center font-medium text-gray-300 mr-2">
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

  // Top100 카테고리 데이터 셋팅
  setTop100Category(data: top100Category) {
    this.logText('setTop100Category');
    const categoryList = data.data.list;

    const divTag = select<HTMLDivElement>('#top100Category');
    divTag.innerText = '';

    categoryList.forEach(value => {
      const buttonTag = tagCreat('button');
      buttonTag.setAttribute(
        'class',
        'categoryBtn text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
      );
      buttonTag.setAttribute('type', 'button');
      buttonTag.setAttribute('value', `${value.id}`);
      buttonTag.addEventListener('click', () => {
        Top100Music.musicCategory = value.id;
        this.changeCategory(value.id);
      });

      buttonTag.innerText = value.name;

      divTag.appendChild(buttonTag);
    });
  }

  logText(funcionName: string) {
    console.log('[Top100Music] ', funcionName);
  }

  render() {
    this.top100MusicInit();
    this.logText('render');
    return `
    <div x-data = "{isAlert : false}">
      <div id="top100Category" class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        
      </div>

      <div class="divide-y divide-gray-100 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <ul id="Top100List" role="list" >
          
        </ul>
      </div>

      <div x-show="isAlert"    
        class="moreOverAlert my-8 flex flex-wrap justify-center gap-4 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">[최대 차트 조회]</p>
        <p class="text-sm">조회할 수 있는 차트의 최대 순위는 100위입니다.</p>
      </div>

      <div class="my-8 flex flex-wrap justify-center gap-4">
        <button id="moreTop100" class="inline-block w-64 rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-red-600">
          더보기
        </button>
      </div>
    </div>
    `;
  }

  // 더보기
  moreTop100() {
    this.logText('moreTop100');
    const moreBtn = select('#moreTop100');

    moreBtn.addEventListener('click', () => {
      if (this.musicView === 100) {
        select('.moreOverAlert').setAttribute('x-show', 'true');
      } else {
        this.musicView += 20;
        this.top100MusicInit();
      }
    });
  }

  // 카테고리 변경
  changeCategory(id: number) {
    select('.moreOverAlert').setAttribute('x-show', 'false');

    Top100Music.musicCategory = id;
    this.musicView = 20;

    this.top100MusicInit();
  }
}
