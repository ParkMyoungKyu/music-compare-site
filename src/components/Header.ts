import Router from '../router/Router';
import { select, selectAll } from '../utils/ElementUtils';

export class Header {
  render(): string {
    return `
      <header class="inset-x-0 top-0 z-50"  x-data="{ isMenuOpen: false }">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <button id="logo" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </button>
        </div>
        <div class="flex lg:hidden">
          <button @click="isMenuOpen = !isMenuOpen" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <button value="recent" class="titleBtn text-sm font-semibold leading-6 text-gray-900">오늘 발매 음악</button>
          <button value="top100" class="titleBtn text-sm font-semibold leading-6 text-gray-900">Top 100</button>
          <button value="genre"  class="titleBtn text-sm font-semibold leading-6 text-gray-900">장르별 음악</button>
          <button value="char"   class="titleBtn text-sm font-semibold leading-6 text-gray-900">차트비교</button>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> -->
        </div>
      </nav>

      <!-- Mobile menu, show/hide based on menu open state. -->
      <div x-show="isMenuOpen"
           x-transition:enter="ease-out duration-300"
           x-transition:enter-start="opacity-0"
           x-transition:enter-end="opacity-100"       
           x-transition:leave="ease-in duration-200"     
           x-transition:leave-start="opacity-100"     
           x-transition:leave-end="opacity-0"    
           
           class="lg:hidden" role="dialog" aria-modal="true" >
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-50"></div>
        <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <button id="logo" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </button>
            <button type="button" @click="isMenuOpen = !isMenuOpen" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <button value="recent" class="titleBtn -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">오늘 발매 음악</a>
                <button value="top100" class="titleBtn -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Top 100</a>
                <button value="genre"  class="titleBtn -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">장르별 음악</a>
                <button value="char"   class="titleBtn -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">차트비교</a>
              </div>
              <div class="py-6">
                <!-- <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
  }

  // header 이동
  headerMoveEvent() {
    const headerMove = new Router();
    const logo = select('#logo');
    logo.addEventListener('click', () => {
      headerMove.navigateTo('/');
    });

    const headerBtn = selectAll<NodeListOf<HTMLButtonElement>>('.titleBtn');
    headerBtn.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        console.log('Header Go > ', button.value);
        headerMove.navigateTo('/' + button.value);
      });
    });
  }
}
