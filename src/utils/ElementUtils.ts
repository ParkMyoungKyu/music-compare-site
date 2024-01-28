// 요소 생성
export function tagCreat<T extends HTMLElement>(tagCreat: string) {
  const tag = document.createElement(tagCreat);
  return tag as T;
}
// 요소 선택
export function select<T extends HTMLElement>(selector: string) {
  const element = document.querySelector(selector); // id
  return element as T;
}

export function selectAll<T extends NodeListOf<HTMLElement>>(selector: string) {
  const element = document.querySelectorAll(selector);
  return element as T;
}
