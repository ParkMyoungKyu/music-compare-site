import { artistInfoResData } from '../models/ArtistInfoModel';
import { select } from '../utils/ElementUtils';
import { ArtistInfoAxios } from '../utils/MusicAxios';
import { ArtistAlbum } from './ArtistAlbum';
import { ArtistMusic } from './ArtistMusic';
import Alpine from 'alpinejs';

const ArtistMusicList = new ArtistMusic();
const ArtistAlbumList = new ArtistAlbum();

Alpine.data('artistDetail', () => ({
  artistAlbumPopup: false,
  artistDetailOpen(value: string) {
    if (value == 'album') {
      this.artistAlbumPopup = true;
      ArtistAlbumList.getArtistAlbum(ArtistInfo.artistId);
    } else {
      this.artistAlbumPopup = false;
      ArtistMusicList.getArtistMusic(ArtistInfo.artistId);
    }
  },
}));

export class ArtistInfo {
  static artistId: number;

  async getArtistInfo(id: number) {
    ArtistInfo.artistId = id;
    this.logText('getArtistInfo');

    const element = document.getElementById('music');
    if (element) element.dispatchEvent(new Event('click'));

    const { data: artistInfo } = await this.artistInfoReq(id);

    this.setArtistInfo(artistInfo);
  }

  /**
    가수 정보 가져오기
  */
  artistInfoReq(id: number) {
    const callUrl = `https://www.music-flo.com/api/meta/v1/artist/${id}`;
    return ArtistInfoAxios(callUrl);
  }

  /**
    가수 정보 데이터 셋팅
  */
  setArtistInfo(artistInfo: artistInfoResData) {
    console.log(artistInfo.data);
    const artistResData = artistInfo.data;

    const artistImg = select('#artistImg');
    artistImg.setAttribute('src', artistResData.imgList[5].url);
    artistImg.setAttribute('alt', artistResData.name + ' 이미지');

    const artistName = select('#artistName');
    artistName.innerText = artistResData.name;

    const artistGroupType = select('#artistGroupType');
    artistGroupType.innerText = artistResData.artistGroupTypeStr;

    const genderCdStr = select('#genderCdStr');
    genderCdStr.innerText = artistResData.genderCdStr;

    const artistStyle = select('#artistStyle');
    artistStyle.innerText = artistResData.artistStyle;

    ArtistMusicList.getArtistMusic(ArtistInfo.artistId);
  }

  render(): string {
    return `
    <div x-show="artistOpenPopup" id="albumPopup" class="relative z-10" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.
    
        Entering: "ease-out duration-300"
            From: "opacity-0"
            To:   "opacity-100"
        Leaving:  "ease-in duration-200"
            From: "opacity-100"
            To:   "opacity-0"
        -->
        <div 
        x-show="artistOpenPopup"
             x-transition:enter="ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"       
             x-transition:leave="ease-in duration-200"     
             x-transition:leave-start="opacity-100"     
             x-transition:leave-end="opacity-0"     

             class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <!--
                Modal panel, show/hide based on modal state.
        
                Entering: "ease-out duration-300"
                From:     "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                To:       "opacity-100 translate-y-0 md:scale-100"
                Leaving:  "ease-in duration-200"
                From:     "opacity-100 translate-y-0 md:scale-100"
                To:       "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            -->
            <div 
            x-show="artistOpenPopup"
            x-transition:enter="ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            x-transition:enter-end="opacity-100 translate-y-0 md:scale-100"       
            x-transition:leave="ease-in duration-200"     
            x-transition:leave-start="opacity-100 translate-y-0 md:scale-100"     
            x-transition:leave-end="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        
            class="flex w-full transform text-left text-base transition md:my-8 md:max-w-4xl md:px-4 lg:max-w-7xl">
            <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button @click="artistInfoClose" type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
    
              <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-11 lg:gap-x-8">
                <div class="!w-60 h-60 overflow-hidden rounded-lg bg-gray-100 shadow-2xl sm:col-span-4 lg:col-span-3">
                  <img id="artistImg"/>
                </div>
                <div class="my-auto sm:col-span-6 lg:col-span-5">
                  <h2 id="artistName" class="text-2xl font-bold text-gray-900 sm:pr-12"></h2>

                  <section aria-labelledby="options-heading" class="mt-3">
                    <h3 id="options-heading" class="sr-only">Product options</h3>
                    <form>
                      <div class="font-semibold text-sm text-slate-600 grid gap-1.5 grid-cols-1">
                        <h4 id="artistInfoData" class="mr-5">
                          <span id="artistGroupType"></span>
                          <span class="mr-1 border-r border-gray-400"></span>
                          <span id="genderCdStr"></span>
                          <span class="mr-1 border-r border-gray-400""></span>
                          <span id="artistStyle"></span>
                        </h4>
                      </div>
                      <!-- <button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button> -->
                    </form>
                  </section>
                </div>
                
                <div x-data="artistDetail" class="mt-10 sm:col-start-1 sm:col-end-12 lg:col-start-1 lg:col-end-12">
                  <fieldset class="mt-4">
                    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-8 gap-4">

                      <!-- Active: "ring-2 ring-indigo-500" -->
                      <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                        <input id="music" @click="artistDetailOpen('music')" type="radio" name="size-choice" value="music" class="sr-only" aria-labelledby="size-choice-0-label">
                        <span id="size-choice-0-label">곡</span>
                        <!--
                          Active: "border", Not Active: "border-2"
                          Checked: "border-indigo-500", Not Checked: "border-transparent"
                        -->
                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                      </label>

                      <!-- Active: "ring-2 ring-indigo-500" -->
                      <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                        <input id="album" @click="artistDetailOpen('album')" type="radio" name="size-choice" value="album" class="sr-only" aria-labelledby="size-choice-1-label">
                        <span id="size-choice-1-label">앨범</span>
                        <!--
                          Active: "border", Not Active: "border-2"
                          Checked: "border-indigo-500", Not Checked: "border-transparent"
                        -->
                        <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                      </label>
                      
                    </div>
                  </fieldset>
                  ${ArtistMusicList.render()}
                  ${ArtistAlbumList.render()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  logText(funcionName: string) {
    console.log('[ArtistInfo] ', funcionName);
  }
}
