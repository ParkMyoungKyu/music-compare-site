import axios, { AxiosResponse } from 'axios';
import { albumInfoRes, todayAlbumRes } from '../models/todayAlbum';

// 최신 앨범 목록보기 API 호출
export function RecentAlbumAxios(
  url: string,
): Promise<AxiosResponse<todayAlbumRes>> {
  console.log('-------- RecentMusicAxios --------');
  return axios.get(url);
}

// 앨범 상세보기 API 호출
export function AlbumListAxios(
  url: string,
): Promise<AxiosResponse<albumInfoRes>> {
  console.log('-------- RecentMusicSelectedAxios --------');
  return axios.get(url);
}
