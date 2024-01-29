import { RecentMusic } from '../pages/Recent/RecentMusicList';
import { selectAll } from '../utils/ElementUtils';
type Page = RecentMusic;

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
            <button value="index"  class="titleBtn text-sm font-semibold leading-6 text-gray-900">장르별 음악</button>
            <button value="char"   class="titleBtn text-sm font-semibold leading-6 text-gray-900">차트비교</button>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a> -->
          </div>
        </nav>
      </header>
  `;
  }
  // 페이지 간 이동을 처리하는 메서드
  navigateToAbout(page: string): void {
    // URL 변경
    window.history.pushState({}, page, `/${page}`);
    // About 페이지 렌더링
    renderPage(new RecentMusic());
  }

  initialize(): void {
    // 버튼에 이벤트 리스너 바인딩
    const titleBtn = selectAll<NodeListOf<HTMLButtonElement>>('.titleBtn');
    titleBtn.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () =>
        this.navigateToAbout(button.value),
      );
    });
  }
}

// 렌더링 함수
function renderPage(page: Page): void {
  const appDiv: HTMLElement | null = document.getElementById('app');
  if (appDiv) {
    appDiv.innerHTML = page.render();
  }
}

// 초기 페이지 로딩 시 Home 페이지 렌더링과 초기화 메서드 호출
window.addEventListener('load', () => {
  const homePage = new Header();
  renderPage(homePage);
  homePage.initialize();
});
