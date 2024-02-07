import Alpine from 'alpinejs';
import { select } from '../utils/ElementUtils';
import { Header } from './Header';

// 음악사이트는 정해져있기 때문에 문자형 enum 을 사용해 5가지만 사용한다고 정의함
export enum MusicSiteName {
  Melon = 'Melon',
  Genie = 'Genie',
  FLO = 'FLO',
  Vibe = 'Vibe',
  Bugs = 'Bugs',
}

Alpine.data('alertComponent', () => ({
  openAlertBox: false,
  dangerIcon: `<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2 text-white"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`,

  showAlert() {
    this.openAlertBox = true;
  },
}));

export class MusicSiteList {
  static musicSite: MusicSiteName;
  readonly headerTitle = new Header();
  render(): string {
    return `
    <div x-data="alertComponent" class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <h2 class="text-center text-2xl font-extrabold leading-8 text-gray-900">${this.headerTitle.getHeader()}</h2>
        <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <button @click="showAlert" class="col-span-2 max-h-24 lg:col-span-1" id="${MusicSiteName.Melon}"><img class="w-full object-contain rounded-lg" src="./src/styles/images/${MusicSiteName.Melon}.png" alt="${MusicSiteName.Melon}" width="158" height="48"></button>
          <button @click="showAlert" class="col-span-2 max-h-24 lg:col-span-1" id="${MusicSiteName.Genie}"><img class="w-full object-contain rounded-lg" src="./src/styles/images/${MusicSiteName.Genie}.jpg" alt="${MusicSiteName.Genie}" width="158" height="48"></button>
          <button class="col-span-2 max-h-24 lg:col-span-1" id="${MusicSiteName.FLO}">  <img class="w-full object-contain rounded-lg" src="./src/styles/images/${MusicSiteName.FLO}.png" alt="${MusicSiteName.FLO}" width="158" height="48"></button>
          <button @click="showAlert" class="col-span-2 max-h-24 lg:col-span-1 sm:col-start-2 " id="${MusicSiteName.Vibe}"> <img class="w-full object-contain rounded-lg" src="./src/styles/images/${MusicSiteName.Vibe}.jpg" alt="${MusicSiteName.Vibe}" width="158" height="48"></button>
          <button @click="showAlert" class="col-span-2 max-h-24 lg:col-span-1 sm:col-start-auto col-start-2" id="${MusicSiteName.Bugs}"> <img class="w-full object-contain rounded-lg" src="./src/styles/images/${MusicSiteName.Bugs}.jpg" alt="${MusicSiteName.Bugs}" width="158" height="48"></button>
        </div>
        
        <div class="flex items-center justify-center py-1 md:py-1 flex-wrap">
          <div x-init="$watch('openAlertBox', value => {
                if(value){
                  setTimeout(function () {
                    openAlertBox = false
                  }, 2000)
                }
              })"
              x-show="openAlertBox"
              x-transition:enter="transition ease-out duration-300"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="transition ease-in duration-300"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0" 

            role="alert" class="w-full md:w-auto flex absolute opacity-90 rounded-xl border border-gray-700 bg-gray-700 p-4">
            <div class="flex items-start gap-4">
              <span class="text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
              </span>

              <div class="flex-1">
                <strong class="block font-medium text-gray-100"> 서비스는 준비중입니다 </strong>
                <p id="noService" class="mt-1 text-sm text-gray-100"></p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>   
    `;
  }

  getMusicSite(): MusicSiteName {
    this.logText('getMusicSite ' + MusicSiteList.musicSite);
    if (!MusicSiteList.musicSite) {
      MusicSiteList.musicSite = MusicSiteName.FLO;
    }
    return MusicSiteList.musicSite;
  }

  setMusicSite(musicSite: string): void {
    this.logText('setMusicSite ' + musicSite);
    MusicSiteList.musicSite = musicSite as MusicSiteName;
  }

  logText(funcionName: string) {
    console.log('[MusicSiteList] ' + funcionName);
  }

  // 음악 사이트 이동
  musicSiteMoveEvent() {
    for (const site in MusicSiteName) {
      const musicSiteBtn = select(`#${site}`);
      musicSiteBtn.addEventListener('click', () => {
        this.logText('musicSiteMoveEvent ' + site);
        if (site == MusicSiteName.FLO) {
          this.setMusicSite(site);
        } else {
          select('#noService').innerText =
            `선택하신 [ ${site} ] 사이트는 현재 서비스 준비중입니다`;
        }
      });
    }
  }
}
