// START 최신 발매 앨범 목록
export interface recentAlbumRes {
  code: string;
  data: recentAlbumResData;
  traceId: string;
}

interface recentAlbumResData {
  currentPage: number;
  lastPageYn: string;
  list: recentAlbumResDataList[];
  name: string;
  totalCount: number;
}

interface imgList {
  size: number;
  url: string;
}

interface artistInfo {
  id: number;
  name: string;
}

export interface recentAlbumResDataList {
  albumLabelList: object[];
  albumType: string;
  albumTypeStr: string;
  artistList: Array<artistInfo>;
  availableSizeList: Array<number>;
  categoryType: string;
  genreStyle: string;
  id: number;
  imgList: Array<imgList>;
  imgUrlFormat: string;
  releaseYmd: string;
  representationArtist: object;
  title: string;
}
// END 오늘 발매 앨범 목록

// START 오늘 발매 앨범 상세보기
export interface albumInfoRes {
  code: string;
  data: albumInfoResList;
  traceId: string;
}

export interface albumInfoResList {
  list: Array<albumInfoDetail>;
}

interface albumDetail {
  albumLabelList: albumLabelList[];
  albumType: string;
  albumTypeStr: string;
  genreStyle: string;
  id: number;
  imgList: Array<imgList>;
  releaseYmd: string;
  title: string;
}

interface albumLabelList {
  dispSn: number;
  labelId: number;
  labelNm: string;
}

export interface albumInfoDetail {
  adultAuthYn: string;
  agencyId: number;
  album: albumDetail;
  artistList: Array<artistInfo>;
  audioContentYn: string;
  createDateTime: string;
  diskId: string;
  dislikeArtistYn: string;
  dislikeYn: string;
  dispStartDtime: string;
  displayYn: string;
  fileUpdateDateTime: string;
  freeYn: string;
  holdbackYn: string;
  id: number;
  name: string;
  originTrackYn: string;
  playTime: string;
  representationArtist: object;
  subtractQty: string;
  svcDrmYn: string;
  svcFlacYn: string;
  svcStreamingYn: string;
  titleYn: string;
  trackNo: string;
  updateDateTime: string;
}

export type albumInfoDetailRes = albumInfoDetail[];
// END 오늘 발매 앨범 상세보기