import axios, { AxiosResponse } from 'axios';
import { albumInfoRes, recentAlbumResData } from '../models/RecentAlbum';
import { top100AlbumResData, top100Category } from '../models/Top100Album';
import { genreList } from '../models/GenreList';

// 최신 앨범 목록보기 API 호출
export function RecentAlbumAxios(
  url: string,
): Promise<AxiosResponse<recentAlbumResData>> {
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
// category [ 1:flo 차트 2: 월간 종합차트 3: 주간 종합차트 ....]
// category 리스트 조회
// https://www.music-flo.com/api/display/v1/browser/chart/menu/list

// size = [ 노출 목록 갯수 ]
// https://www.music-flo.com/api/display/v1/browser/chart/${category}/track/list?size=100

// Top100 카테고리 리스트
export function Top100CategoryAxios(
  url: string,
): Promise<AxiosResponse<top100Category>> {
  console.log('-------- Top100CategoryAxios --------');
  return axios.get(url);
}

// Top100 앨범 목록 가져오기
export function Top100AlbumAxios(
  url: string,
): Promise<AxiosResponse<top100AlbumResData>> {
  console.log('-------- Top100AlbumAxios --------');
  return axios.get(url);
}

// 장르 목록보기 API 호출
export function GenreListAxios(url: string): Promise<AxiosResponse<genreList>> {
  console.log('-------- GenreCategoryAxios --------');
  return axios.get(url);
}

// 선택 장르 리스트 가져오기
export function GenreAlbumListAxios(
  url: string,
): Promise<AxiosResponse<genreList>> {
  console.log('-------- GenreAlbumListAxios --------');
  return axios.get(url);
}
