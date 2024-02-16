// tailwind import
import './styles/tailwind.css';

import Router from './router/Router';
import { select } from './utils/ElementUtils';

export class Main {
  render(): string {
    return `
      <section class="bg-gray-900 text-white">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div class="mx-auto max-w-3xl text-center">
            <h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Music Comparison Site
              <span class="sm:block"> Increase Conversion. </span>
            </h1>
            <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Search for the music you want on various music sites.<br>
              Melon, Genie, FLO, Vibe, Bugs 
            </p>
      
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <button id="getStart" class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" href="#">
                Get Started
              </button>
      
              <button style="display:none;" class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" href="#">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  getStart() {
    const getStart = select('#getStart');
    const serviceStart = new Router();
    // 초기 화면은 최신앨범으로...
    getStart.addEventListener('click', () => {
      serviceStart.navigateTo('/recent');
    });
  }
}
