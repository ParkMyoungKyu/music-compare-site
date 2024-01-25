export class RecentMusicPopup {
  render(): string {
    return `<div
        x-show="isPopup"
        id="albumPopup" class="relative z-10" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.
    
        Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
        Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div 
        x-show="isPopup"
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
            From: "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            To: "opacity-100 translate-y-0 md:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 md:scale-100"
            To: "opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        -->
        <div 
        x-show="isPopup"
        x-transition:enter="ease-out duration-300"
        x-transition:enter-start="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        x-transition:enter-end="opacity-100 translate-y-0 md:scale-100"       
        x-transition:leave="ease-in duration-200"     
        x-transition:leave-start="opacity-100 translate-y-0 md:scale-100"     
        x-transition:leave-end="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
    
        class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
                @click="isPopup = !isPopup"
                type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
    
            <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div id="titleImg" class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 shadow-2xl sm:col-span-4 lg:col-span-5">
                <!-- <img src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg" 
                alt="Two each of gray, white, and black shirts arranged on table." 
                class="object-cover object-center"> -->
                </div>
                <div class="sm:col-span-8 lg:col-span-7">
                <h2 id="albumType" class="text-sm font-bold text-gray-400 sm:pr-12"></h2>
                <h2 id="albumName" class="text-2xl font-bold text-gray-900 sm:pr-12"></h2>
    
                <section aria-labelledby="information-heading" class="mt-2">
                    <h3 id="information-heading" class="sr-only">Product information</h3>
    
                    <p id="artistName" class="text-base text-gray-900"></p>
    
                    <!-- Reviews 
                    <div class="mt-6">
                    <h4 class="sr-only">Reviews</h4>
                    <div class="flex items-center">
                        <div class="flex items-center">
                        Active: "text-gray-900", Default: "text-gray-200" 
                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        </div>
                        <p class="sr-only">3.9 out of 5 stars</p>
                        <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                    </div>
                    </div>
                -->
                </section>
    
                <section aria-labelledby="options-heading" class="mt-3">
                    <h3 id="options-heading" class="sr-only">Product options</h3>
                    <form>
                    <!-- Colors -->
                    <div class="font-semibold text-sm text-slate-600 grid gap-1.5 grid-cols-2">
                        <h4 class="mr-5">발매일</h4>
                        <h4 id="releaseYmd"></h4>
                        <h4 class="mr-5">장르</h4>
                        <h4 id="genreStyle"></h4>
                        <h4 class="mr-5">기획사</h4>
                        <h4 id="labelNm"></h4>
                    </div>
                    <!-- <button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button> -->
                    </form>
                </section>
                </div>
                <div class="sm:col-start-1 sm:col-end-12 lg:col-start-1 lg:col-end-12">
                <!-- Sizes -->
                <div class="mt-10">
                    <div class="flex items-center justify-between py-1">
                    <h4 class="text-base font-semibold text-gray-900">수록곡</h4>
                    <!-- <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a> -->
                    </div>
                    <hr>
                    <ul role="list" class="divide-y divide-gray-100">
                    <li class="flex justify-between gap-x-6 py-1">
                        <div class="flex min-w-0 gap-x-4">
                        <div class="w-12 flex-none rounded-lg"></div>
                        <!-- <img class="h-12 w-12 flex-none rounded-lg bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> -->
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-medium leading-6 text-gray-900">곡/앨범</p>
                        </div>
                        </div>
                        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm leading-6 text-gray-900">아티스트</p>
                        </div>
                    </li>
                    </ul>
                    <hr>
                    <ul id="albumList" role="list" class="divide-y divide-gray-100">
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
  }
}
