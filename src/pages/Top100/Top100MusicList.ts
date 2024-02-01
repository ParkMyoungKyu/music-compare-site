import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { select, tagCreat } from '../../utils/ElementUtils';
import { Top100AlbumAxios } from '../../utils/MusicAxios';

import { DateUtils, DateFormat } from '../../utils/DateUtils';
const dataUtil = new DateUtils();

export class Top100Music {
  musicSite: MusicSiteList = new MusicSiteList();

  top100MusictInit() {
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();

    let callUrl: string = ''; // axios 호출 url

    callUrl =
      'https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100';
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
  setTop100AlbumList(data: any) {
    this.logText('setTop100AlbumList');
    console.log(data);
    const Top100List = data.data.trackList;
    console.log(Top100List);

    const UlTag = select('#Top100List');
    Top100List.forEach((value: any) => {
      console.log(value);
      const liTag = tagCreat('li');
      liTag.setAttribute('class', 'flex justify-between gap-x-6 py-5');

      const divTag01 = tagCreat('div');
      divTag01.setAttribute('class', 'flex min-w-0 gap-x-4');

      const imgTag01 = tagCreat('img');
      imgTag01.setAttribute(
        'class',
        'h-12 w-12 flex-none rounded-lg bg-gray-50',
      );
      imgTag01.setAttribute('src', value.album.imgList[5].url);

      const divTag01_01 = tagCreat('div');
      divTag01_01.setAttribute('class', 'min-w-0 flex-auto');

      const pTag01 = tagCreat('p');
      pTag01.setAttribute(
        'class',
        'text-sm font-semibold leading-6 text-gray-900',
      );
      pTag01.innerText = value.name;

      const pTag02 = tagCreat('p');
      pTag02.setAttribute(
        'class',
        'mt-1 truncate text-xs leading-5 text-gray-500',
      );
      pTag02.innerText = value.album.title;

      const divTag02 = tagCreat('div');
      divTag02.setAttribute(
        'class',
        'hidden shrink-0 sm:flex sm:flex-col sm:items-end',
      );

      const pTag02_01 = tagCreat('p');
      pTag02_01.setAttribute('class', 'text-sm leading-6 text-gray-900');
      pTag02_01.innerText = value.artistList[0].name;

      const divTag02_01 = tagCreat('div');
      divTag02_01.setAttribute('class', 'mt-1 flex items-center gap-x-1.5');

      const divTag02_01_01 = tagCreat('div');
      divTag02_01_01.setAttribute(
        'class',
        'flex-none rounded-full bg-emerald-500/20 p-1',
      );

      const divTag02_01_01_01 = tagCreat('div');
      divTag02_01_01_01.setAttribute(
        'class',
        'h-1.5 w-1.5 rounded-full bg-emerald-500',
      );

      const pTag02_02 = tagCreat('p');
      pTag02_02.setAttribute('class', 'mt-1 text-xs leading-5 text-gray-500');
      pTag02_02.innerText = dataUtil.dateformat(
        value.album.releaseYmd,
        DateFormat.yyyymmdd,
      );

      divTag01_01.appendChild(pTag01);
      divTag01_01.appendChild(pTag02);
      divTag01.appendChild(imgTag01);
      divTag01.appendChild(divTag01_01);

      divTag02_01_01.appendChild(divTag02_01_01_01);
      divTag02_01.appendChild(divTag02_01_01);
      divTag02_01.appendChild(pTag02_02);
      divTag02.appendChild(pTag02_01);
      divTag02.appendChild(divTag02_01);

      liTag.appendChild(divTag01);
      liTag.appendChild(divTag02);

      UlTag.appendChild(liTag);
    });
  }

  logText(funcionName: string) {
    console.log('[Top100Music] ' + funcionName);
  }

  render() {
    this.top100MusictInit();
    this.logText('render');
    return `
    <ul id="Top100List" role="list" class="divide-y divide-gray-100 mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
      <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-lg bg-gray-50" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">Dries Vincent</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">dries.vincent@example.com</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">Business Relations</p>
          <div class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p class="mt-1 text-xs leading-5 text-gray-500">Last seen</p>
            <!-- <p class="text-xs leading-5 text-gray-500">Online</p> -->
          </div>
        </div>
      </li>
    </ul>
    `;
  }
}
