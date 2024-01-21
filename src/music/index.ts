export interface Country {
  Country: string;
  CountryCode: string;
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: any;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

interface Global {
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface CovidSummaryResponse {
  Countries: Country[];
  Date: string;
  Global: Global;
  Message: string;
}

export interface CountrySummaryInfo {
  Cases: number;
  City: string;
  CityCode: string;
  Country: string;
  CountryCode: string;
  Date: string;
  Lat: string;
  Lon: string;
  Province: string;
  Status: string;
}

export type CountrySummaryResponse = CountrySummaryInfo[];

// 여기부터는 음악가져오기 interface
export interface todayMusicRes {
  code: string;
  data: todayMusicResData;
  traceId: string;
}

interface todayMusicResData {
  currentPage: number;
  lastPageYn: string;
  list: todayMusicResDataList[];
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

export interface todayMusicResDataList {
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
