import { AxiosResCommon } from './AxiosResCommon';

// START 최신 발매 앨범 목록
export interface recentAlbumResData extends AxiosResCommon {
  data: {
    currentPage: number;
    lastPageYn: string;
    list: recentAlbumResDataList[];
    name: string;
    totalCount: number;
  };
}

export interface recentAlbumResDataList {
  albumLabelList: object[];
  albumType: string;
  albumTypeStr: string;
  artistList: [{ id: number; name: string }];
  availableSizeList: Array<number>;
  categoryType: string;
  genreStyle: string;
  id: number;
  imgList: Array<{
    size: number;
    url: string;
  }>;

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

export interface albumInfoDetail {
  adultAuthYn: string;
  agencyId: number;
  album: {
    albumLabelList: [{ dispSn: number; labelId: number; labelNm: string }];
    albumType: string;
    albumTypeStr: string;
    genreStyle: string;
    id: number;
    imgList: Array<{
      size: number;
      url: string;
    }>;
    releaseYmd: string;
    title: string;
  };
  artistList: [{ id: number; name: string }];
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
