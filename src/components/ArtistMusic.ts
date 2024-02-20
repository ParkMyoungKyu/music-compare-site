import { artistMusicResData } from '../models/ArtistInfoModel';
import { select } from '../utils/ElementUtils';
import { ArtistMusicAxios } from '../utils/MusicAxios';
import { DateFormat, DateUtils } from '../utils/DateUtils';
const dataUtil = new DateUtils();

export class ArtistMusic {
  async getArtistMusic(id: number) {
    const { data: artistMusic } = await this.artistMusicReq(id);

    this.setArtistMusic(artistMusic);
  }

  /**
   * 가수 곡 리스트 가져오기
   */
  artistMusicReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}/track?page=1&size=50&sortType=POPULARITY&roleType=ALL`;
    return ArtistMusicAxios(callUrl);
  }

  /**
   * 가수 곡 리스트 데이터 셋팅
   */
  setArtistMusic(artistInfo: artistMusicResData) {
    console.log(artistInfo.data);
    const artistMusicList = artistInfo.data.list;
    const ulTag = select<HTMLUListElement>('#musicList');
    ulTag.innerHTML = '';

    artistMusicList.forEach(value => {
      let artistName = '';
      for (const i in value.artistList) {
        artistName +=
          i == '0'
            ? value.artistList[i].name
            : ' & ' + value.artistList[i].name;
      }

      ulTag.innerHTML += `
        <li class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
                <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="${value.album.imgList[5].url}" alt="${value.album.title} 이미지">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">${value.name}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">${value.album.title}</p>
                </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-10">
                <p class="text-sm leading-6 text-gray-900">${artistName}</p>
                <p class="mt-1 text-xs leading-5 text-gray-500">${dataUtil.dateformat(value.album.releaseYmd, DateFormat.yyyymmdd)}</p>
            </div>
        </li>
      `;
    });
  }

  render(): string {
    return `
       <div x-show="!artistAlbumPopup" class="sm:col-start-1 sm:col-end-12 lg:col-start-1 lg:col-end-12">
            <!-- Sizes -->
            <div class="mt-10">
            <div class="flex items-center justify-between py-1">
                <h4 class="text-base font-semibold text-gray-900"></h4>
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
                    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-10">
                        <p class="text-sm leading-6 text-gray-900">아티스트</p>
                    </div>
                </li>
            </ul>
            <hr>
            <ul id="musicList" role="list" class="divide-y divide-gray-100"></ul>
            </div>
        </div>
       `;
  }
}
