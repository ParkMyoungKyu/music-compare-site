// tailwind import
import './styles/tailwind.css';

// Alpine import
import Alpine from 'alpinejs';
Alpine.start();

// 컴포넌트 import
import { Router } from './router/Router';

const appRoot = new Router();

// 초기 페이지 로딩시 라우터에 따른 페이지, header,footer 랜더링
window.addEventListener('load', () => {
  console.log('load Event : ', window.location.pathname);
  appRoot.navigateTo(window.location.pathname);
  initEventRender();
});

// 뒤로가기, 앞으로가기 제어
window.addEventListener('popstate', () => {
  appRoot.navigateTo(window.location.pathname);
});

// 화면에 랜더링 이후 이벤트 랜더링 진행
function initEventRender() {
  console.log('initEvent');
}
