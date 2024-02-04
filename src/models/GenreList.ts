export interface genreList {
  code: string;
  data: genreListResData;
  traceId: string;
}

interface genreListResData {
  list: genreListInfo[];
  type: string;
}

export interface genreListInfo {
  id: number;
  imgList: [{ size: number; url: string }];
}
