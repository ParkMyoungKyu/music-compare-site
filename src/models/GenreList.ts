import { AxiosResCommon } from './AxiosResCommon';

export interface genreList extends AxiosResCommon {
  data: { list: genreListInfo[]; type: string };
}

export interface genreListInfo {
  id: number;
  imgList: [{ size: number; url: string }];
}

export interface genreAlbumResData extends AxiosResCommon {
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
    trackList: genreAlbumResDataList[];
    type: string;
    updateDateTime: number;
  };
}

export interface genreAlbumResDataList {
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
