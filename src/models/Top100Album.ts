import { AxiosResCommon } from './AxiosResCommon';
// START TOP100 카테고리 리스트 가져오기
export interface top100Category extends AxiosResCommon {
  data: {
    list: Array<{ id: number; name: string }>;
  };
}
// END TOP100 카테고리 리스트 가져오기

export interface top100AlbumResData extends AxiosResCommon {
  data: {
    basedOnUpdate: string;
    createDateTime: number;
    description: string;
    id: number;
    imgList: object;
    likeYn: string;
    name: string;
    tasteMix: string;
    totalCount: number;
    trackList: top100AlbumResDataList[];
    type: string;
    updateDateTime: number;
  };
}

export interface top100AlbumResDataList {
  adultAuthYn: string;
  agencyId: number;
  album: {
    type: string;
    id: number;
    imgList: Array<{
      size: number;
      url: string;
    }>;
    title: string;
    releaseYmd: string;
  };
  artistList: [{ id: number; name: string; type: string }];
  displayYn: string;
  fileUpdateDateTime: string;
  freeYn: string;
  id: number;
  name: string;
  rank: {
    newYn: string;
    rankBadge: number;
  };
  representationArtist: {
    id: number;
    name: string;
    type: string;
  };
  svcDrmYn: string;
  svcStreamingYn: string;
  unReleasedYn: string;
  updateDateTime: string;
}
