import {
  artistAlbumResData,
  artistInfoResData,
  artistMusicResData,
} from '../models/ArtistInfoModel';
import {
  ArtistAlbumAxios,
  ArtistInfoAxios,
  ArtistMusicAxios,
} from '../utils/MusicAxios';

export class ArtistInfo {
  constructor(id: number) {
    this.getArtistInfo(id);
  }

  async getArtistInfo(id: number) {
    this.logText('getArtistInfo');
    const { data: artistInfo } = await this.artistInfoReq(id);
    const { data: artistMusic } = await this.artistMusicReq(id);
    const { data: artistAlbum } = await this.artistAlbumReq(id);

    this.setArtistInfo(artistInfo);
    this.setArtistMusic(artistMusic);
    this.setArtistAlbum(artistAlbum);
  }

  /**
    가수 정보 가져오기
  */
  artistInfoReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}`;
    return ArtistInfoAxios(callUrl);
  }

  /**
   * 가수 곡 리스트 가져오기
   */
  artistMusicReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}/track?page=1&size=50&sortType=POPULARITY&roleType=ALL`;
    return ArtistMusicAxios(callUrl);
  }

  /**
   * 가수 앨범 리스트 가져오기
   */
  artistAlbumReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}/album?page=1&size=50&sortType=RECENT&roleType=RELEASE`;
    return ArtistAlbumAxios(callUrl);
  }

  /**
    가수 정보 데이터 셋팅
  */
  setArtistInfo(artistInfo: artistInfoResData) {
    console.log(artistInfo.data);
  }

  /**
   * 가수 곡 리스트 데이터 셋팅
   */
  setArtistMusic(artistInfo: artistMusicResData) {
    console.log(artistInfo.data);
  }

  /**
   * 가수 앨범 리스트 데이터 셋팅
   */
  setArtistAlbum(artistInfo: artistAlbumResData) {
    console.log(artistInfo.data);
  }

  logText(funcionName: string) {
    console.log('[ArtistInfo] ', funcionName);
  }
}
