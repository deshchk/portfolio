// getElementById
export const id = DOMid => document.getElementById(DOMid)
// querySelector in X
export const q = (where, what) => where?.querySelector(what)
// querySelectorAll in X
export const qAll = (where, what) => where?.querySelectorAll(what)
// addEventListener
export const on = (el, evt, func, opt = {}) => el.addEventListener(evt, func, opt)
// change spaces after orphans to nbsp
export const nbsp = el => el.replace(/(\s)([aAwWiIzZoOuU])(\s)/g, '$1$2\xa0')
export const firstUpper = string => string.charAt(0).toUpperCase() + string.slice(1)
// get random from range
export const getR = range => Math.floor(Math.random() * range)
// get random from array
export const rFrom = array => array[getR(array.length)]