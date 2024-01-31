import { select } from '../utils/ElementUtils';

// 음악사이트는 정해져있기 때문에 문자형 enum 을 사용해 5가지만 사용한다고 정의함
export enum MusicSiteName {
  melon = 'melon',
  genie = 'genie',
  flo = 'flo',
  vibe = 'vibe',
  bugs = 'bugs',
}

export class MusicSiteList {
  public musicSite: MusicSiteName = MusicSiteName.flo;

  constructor(musicSite?: MusicSiteName) {
    console.log('MusicSiteList Init : ', musicSite);
    if (musicSite) this.musicSite = musicSite;
  }

  render(): string {
    return `
      <div class="bg-white py-12 sm:py-12">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 class="text-center text-2xl font-extrabold leading-8 text-gray-900">Today's Released Music</h2>
          <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <button id="${MusicSiteName.melon}"><img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.melon}.png" alt="${MusicSiteName.melon}" width="158" height="48"></button>
            <button id="${MusicSiteName.genie}"><img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.genie}.jpg" alt="${MusicSiteName.genie}" width="158" height="48"></button>
            <button id="${MusicSiteName.flo}"><img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.flo}.png" alt="${MusicSiteName.flo}" width="158" height="48"></button>
            <button id="${MusicSiteName.vibe}"><img class="col-span-2  w-full object-contain sm:col-start-2 lg:col-span-1" src="./src/styles/images/${MusicSiteName.vibe}.jpg" alt="${MusicSiteName.vibe}" width="158" height="48"></button>
            <button id="${MusicSiteName.bugs}"><img class="col-span-2 col-start-2  w-full object-contain sm:col-start-auto lg:col-span-1" src="./src/styles/images/${MusicSiteName.bugs}.jpg" alt="${MusicSiteName.bugs}" width="158" height="48"></button>
          </div>
        </div>
      </div>
    `;
  }

  // 음악 사이트 이동
  musicSiteMoveEvent() {
    for (const site in MusicSiteName) {
      const musicSiteBtn = select(`#${site}`);
      musicSiteBtn.addEventListener('click', () => {
        console.log('musicSiteMoveEvent : ', site);
        this.musicSite = site as MusicSiteName;
      });
    }
  }
}
