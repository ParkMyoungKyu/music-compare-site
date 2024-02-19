import { AxiosResCommon } from './AxiosResCommon';

// START 가수 정보 조회
export interface artistInfoResData extends AxiosResCommon {
  data: {
    artistGroupTypeStr: string;
    artistStyle: string;
    dislikeArtistYn: string;
    genderCd: string;
    genderCdStr: string;
    hasVideoYn: string;
    id: number;
    imgList: Array<{
      size: number;
      url: string;
    }>;
    likeYn: string;
    name: string;
    video: {
      agencyId: number;
      artistList: object;
      gridThumbnailImageList: object;
      id: number;
      mediaRatingType: string;
      mediaRatingTypeStr: string;
      playTm: string;
      representationArtist: object;
      resourceId: string;
      svcFreeYn: string;
      svcStreamingYn: string;
      thumbnailImageList: object;
      videoFileUpdateDtime: number;
      videoNm: string;
      videoPopularity: number;
      videoReleaseDt: string;
      videoType: string;
      videoTypeStr: string;
    };
  };
}

// START 가수 곡 리스트 조회
export interface artistMusicResData extends AxiosResCommon {
  data: {
    currentPage: number;
    lastPageYn: string;
    list: [
      {
        adultAuthYn: string;
        agencyId: number;
        album: {
          albumType: string;
          albumTypeStr: string;
          id: number;
          imgList: Array<{
            size: number;
            url: string;
          }>;
          releaseYmd: string;
          title: string;
        };
        artistList: Array<{ id: number; name: string }>;
        audioContentYn: string;
        dislikeYn: string;
        displayYn: string;
        fileUpdateDateTime: string;
        freeYn: string;
        holdbackYn: string;
        id: number;
        name: string;
        originTrackYn: string;
        representationArtist: { id: number; name: string };
        svcDrmYn: string;
        svcFlacYn: string;
        svcStreamingYn: string;
        unReleasedYn: string;
        updateDateTime: string;
      },
    ];
    totalCount: number;
  };
}

// START 가수 앨범 리스트 조회
export interface artistAlbumResData extends AxiosResCommon {
  data: {
    currentPage: number;
    lastPageYn: string;
    list: [
      {
        albumType: string;
        albumTypeStr: string;
        artistList: [{ id: number; name: string }];
        id: number;
        imgList: Array<{ size: number; url: string }>;
        releaseYmd: string;
        representationArtist: { id: number; name: string };
        title: string;
      },
    ];
    totalCount: number;
  };
}
