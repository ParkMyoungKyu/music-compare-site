import { MusicSiteList, MusicSiteName } from '../../components/MusicSiteList';
import { genreList, genreListInfo } from '../../models/GenreList';
import { select, tagCreat } from '../../utils/ElementUtils';
import { GenreListAxios } from '../../utils/MusicAxios';

export class GenreMusic {
  musicSite: MusicSiteList = new MusicSiteList();

  genreMusicInit() {
    const thisMusicSite: MusicSiteName = this.musicSite.getMusicSite();

    let callUrl: string = ''; // axios 호출 url

    callUrl = `https://www.music-flo.com/api/personal/v1/preferences/genres`;
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

  // 장르 목록 API 호출
  async setupData(callUrl: string) {
    const { data } = await GenreListAxios(callUrl);
    this.setTop100AlbumList(data);
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
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src="${value.imgList[0].url}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
            </div>
          </button>
          `;

      divTag.appendChild(aTag);
    });
  }

  logText(funcionName: string) {
    console.log('[GenreMusic]', funcionName);
  }

  render(): string {
    this.genreMusicInit();
    this.logText('render');
    return `
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">GenreMusic</h2>
    
        <div id="generList" class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">

        </div>
      </div>
    </div>
  `;
  }
}
