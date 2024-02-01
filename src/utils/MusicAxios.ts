import axios, { AxiosResponse } from 'axios';
import { albumInfoRes, todayAlbumRes } from '../models/todayAlbum';

// 최신 앨범 목록보기 API 호출
export function RecentAlbumAxios(
  url: string,
): Promise<AxiosResponse<todayAlbumRes>> {
  console.log('-------- RecentAlbumAxios --------');
  return axios.get(url);
}

// 앨범 상세보기 API 호출
export function RecentNusicDetailAxios(
  url: string,
): Promise<AxiosResponse<albumInfoRes>> {
  console.log('-------- RecentAlbumDetailAxios --------');
  return axios.get(url);
}

// Top100 목록보기 API 호출

// 최신 차트 가져오기
// category [ 1:flo 차트 2: 월간 종합차트 3: 일간 종합차트 ]
// size = [ 노출 목록 갯수 ]
// https://www.music-flo.com/api/display/v1/browser/chart/${category}/track/list?size=100

export function Top100AlbumAxios(
  url: string,
): Promise<AxiosResponse<todayAlbumRes>> {
  console.log('-------- RecentMusicAxios --------');
  return axios.get(url);
}
