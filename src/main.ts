// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

import Router from './router/Router';
import { select } from './utils/ElementUtils';

export class Main {
  render(): string {
    return `
    <section class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div class="mx-auto max-w-xl text-center">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
            Music Comparison Site
            <strong class="font-extrabold text-red-700 sm:block"> Increase Conversion. </strong>
            </h1>
    
            <p class="mt-4 sm:text-xl/relaxed">
            Search for the music you want on various music sites.<br>
            Melon, Genie, FLO, Vibe, Bugs 
                       
            </p>
    
            <div class="mt-8 flex flex-wrap justify-center gap-4">
            <button id="getStart" class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                Get Started
            </button>
    
            <button style="display:none;" class="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
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
