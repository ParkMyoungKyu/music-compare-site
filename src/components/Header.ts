import Router from '../router/Router';
import { selectAll } from '../utils/ElementUtils';

export class Header {
  render(): string {
    return `
      <header class="bg-white">
        <nav 
        x-data="{ isOpen: false }"
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
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
      </header>
  `;
  }

  // header 이동
  headerMoveEvent() {
    const headerBtn = selectAll<NodeListOf<HTMLButtonElement>>('.titleBtn');
    const headerMove = new Router();
    headerBtn.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        headerMove.navigateTo('/' + button.value);
      });
    });
  }
}
