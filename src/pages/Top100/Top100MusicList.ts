import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { select, tagCreat } from '../../utils/ElementUtils';
import { Top100AlbumAxios } from '../../utils/MusicAxios';

import {
  top100AlbumRes,
  top100AlbumResDataList,
} from '../../models/Top100Album';

export class Top100Music {
  musicSite: MusicSiteList = new MusicSiteList();
  musicView: number = 20; // 처음 보여줄 리스트 갯수
  top100MusicInit() {
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();

    let callUrl: string = ''; // axios 호출 url

    callUrl = `https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=${this.musicView}`;
    if (thisMusicSite === MusicSiteName.melon) {
      this.logText('melon Start');
    } else if (thisMusicSite === MusicSiteName.genie) {
      this.logText('genie Start');
    } else if (thisMusicSite === MusicSiteName.flo) {
      this.logText('flo Start');
    } else if (thisMusicSite === MusicSiteName.vibe) {
      this.logText('vibe Start');
    } else if (thisMusicSite === MusicSiteName.bugs) {
      this.logText('bugs Start');
    }

    this.setupData(callUrl);
  }

  // Top100 앨범 API 호출
  async setupData(callUrl: string) {
    const { data } = await Top100AlbumAxios(callUrl);
    this.setTop100AlbumList(data);
  }

  // Top100 앨범 데이터 셋팅
  setTop100AlbumList(data: top100AlbumRes) {
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

  logText(funcionName: string) {
    console.log('[Top100Music]', funcionName);
  }

  render() {
    this.top100MusicInit();
    this.logText('render');
    return `
    <div class="divide-y divide-gray-100 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
      <ul id="Top100List" role="list" >
        
      </ul>
    </div>
   
    <div class="my-8 flex flex-wrap justify-center gap-4">
      <button id="moreTop100" class="inline-block w-64 rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-red-600">
        더보기
      </button>
    </div>
    `;
  }

  // 더보기
  moreTop100() {
    this.logText('moreTop100');
    const moreBtn = select('#moreTop100');
    moreBtn.addEventListener('click', () => {
      if (this.musicView >= 100) {
        console.log(this.musicView);
      } else {
        this.musicView += 20;
        this.top100MusicInit();
      }
    });
  }
}
