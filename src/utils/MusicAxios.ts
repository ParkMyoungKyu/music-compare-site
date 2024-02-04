import axios, { AxiosResponse } from 'axios';
import { albumInfoRes, recentAlbumRes } from '../models/RecentAlbum';
import { top100AlbumRes } from '../models/Top100Album';
import { genreList } from '../models/GenreList';

// 최신 앨범 목록보기 API 호출
export function RecentAlbumAxios(
  url: string,
): Promise<AxiosResponse<recentAlbumRes>> {
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
// category [ 1:flo 차트 2: 월간 종합차트 3: 일간 종합차트 ]
// size = [ 노출 목록 갯수 ]
// https://www.music-flo.com/api/display/v1/browser/chart/${category}/track/list?size=100

export function Top100AlbumAxios(
  url: string,
): Promise<AxiosResponse<top100AlbumRes>> {
  console.log('-------- RecentMusicAxios --------');
  return axios.get(url);
}

// 장르 목록보기 API 호출
export function GenreListAxios(url: string): Promise<AxiosResponse<genreList>> {
  console.log('-------- GenreCategoryAxios --------');
  return axios.get(url);
}
