import { artistAlbumResData } from '../models/ArtistInfoModel';
import { select } from '../utils/ElementUtils';
import { ArtistAlbumAxios } from '../utils/MusicAxios';
import { DateFormat, DateUtils } from '../utils/DateUtils';
const dataUtil = new DateUtils();

export class ArtistAlbum {
  async getArtistAlbum(id: number) {
    const { data: artistAlbum } = await this.artistAlbumReq(id);

    this.setArtistAlbum(artistAlbum);
  }

  /**
   * 가수 앨범 리스트 가져오기
   */
  artistAlbumReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}/album?page=1&size=50&sortType=RECENT&roleType=RELEASE`;
    return ArtistAlbumAxios(callUrl);
  }

  /**
   * 가수 앨범 리스트 데이터 셋팅
   */
  setArtistAlbum(artistInfo: artistAlbumResData) {
    console.log(artistInfo.data);
    const divTag = select<HTMLDivElement>('#albumList');

    const artistAlbumList = artistInfo.data.list;

    artistAlbumList.forEach(value => {
      let artistName = '';
      for (const i in value.artistList) {
        artistName +=
          i == '0'
            ? value.artistList[i].name
            : ' & ' + value.artistList[i].name;
      }
      divTag.innerHTML += `
        <div class="grid grid-cols-2 gap-x-14 gap-y-14 mt-10">
                <div class="w-48 h-48 sm:mb-0 mb-3">
                    <img src="${value.imgList[5].url}" alt="${value.title} 앨범 이미지" class="h-full w-full object-cover rounded-2xl">
                </div>
                <div class="font-semibold text-sm text-slate-600 grid gap-1.5 grid-cols-2">
                <h4 class="mr-1">${value.title}</h4>
                <h5 class="mr-1">${artistName}</h4>
                <h5 class="mr-1">${value.albumTypeStr}</h4>
                <h5 class="mr-1">${dataUtil.dateformat(value.releaseYmd, DateFormat.yyyymmdd)}</h4>
              </div>
            </div>

        `;
    });
  }

  render(): string {
    return `
        <div x-show="artistAlbumPopup" id="albumList" class="grid grid-cols-3 gap-3 mt-10">
            
        </div>
    `;
  }
}
