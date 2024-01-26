import axios, { AxiosResponse } from 'axios';
import { todayAlbumRes } from '../models/todayAlbum';

// 음악사이트 API 호출
export function MusicAxios(url: string): Promise<AxiosResponse<todayAlbumRes>> {
  console.log('-------- MusicAxios --------');
  return axios.get(url);
}
