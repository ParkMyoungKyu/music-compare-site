// 요소 생성
export function tagCreat<T extends HTMLElement>(tagCreat: string) {
  const tag = document.createElement(tagCreat);
  return tag as T;
}
// 요소 선택
export function $<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}
