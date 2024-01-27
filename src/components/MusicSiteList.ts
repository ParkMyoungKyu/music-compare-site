// 음악사이트는 정해져있기 때문에 문자형 enum 을 사용해 5가지만 사용한다고 정의함
export enum MusicSiteName {
  melon = 'melon',
  genie = 'genie',
  flo = 'flo',
  vibe = 'vibe',
  bugs = 'bugs',
}

export const MusicSite = (): string => `
<div class="bg-white py-12 sm:py-12">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h2 class="text-center text-2xl font-extrabold leading-8 text-gray-900">Today's Released Music</h2>
    <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
      <img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.melon}.png" alt="${MusicSiteName.melon}" width="158" height="48">
      <img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.genie}.jpg" alt="${MusicSiteName.genie}" width="158" height="48">
      <img class="col-span-2  w-full object-contain lg:col-span-1" src="./src/styles/images/${MusicSiteName.flo}.png" alt="${MusicSiteName.flo}" width="158" height="48">
      <img class="col-span-2  w-full object-contain sm:col-start-2 lg:col-span-1" src="./src/styles/images/${MusicSiteName.vibe}.jpg" alt="${MusicSiteName.vibe}" width="158" height="48">
      <img class="col-span-2 col-start-2  w-full object-contain sm:col-start-auto lg:col-span-1" src="./src/styles/images/${MusicSiteName.bugs}.jpg" alt="${MusicSiteName.bugs}" width="158" height="48">
    </div>
  </div>
</div>
<div class="flex items-center justify-center py-1 md:py-1 flex-wrap">
  <button type="button" value="ALL" class="categoryBtn text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All categories</button>
  <button type="button" value="KPOP" class="categoryBtn text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">K-POP</button>
  <button type="button" value="POP" class="categoryBtn text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">POP</button>
</div>
    `;
