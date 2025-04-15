// getElementById
export const id = DOMid => document.getElementById(DOMid)
// querySelector in X
export const q = (where, what) => where?.querySelector(what)
// querySelectorAll in X
export const qAll = (where, what) => where?.querySelectorAll(what)
// addEventListener
export const on = (el, evt, func, opt = {}) => el.addEventListener(evt, func, opt)
// removeEventListener
export const off = (el, evt, func) => el.removeEventListener(evt, func)
// change spaces after orphans to nbsp
export const nbsp = el => el.replace(/(\s)([aAwWiIzZoOuU])(\s)/g, '$1$2\xa0')
export const firstUpper = string => string.charAt(0).toUpperCase() + string.slice(1)
// get random from range
export const getR = range => Math.floor(Math.random() * range)
// get random from array
export const rFrom = array => array[getR(array.length)]
// formatting date to e.g. 10/03/2025
export const formatDate = dateString => new Intl.DateTimeFormat('en-AU').format(new Date(dateString))
// time since date
export const timeElapsed = (dateString, options = null) => {
  if (options === null) options = { y: true, m: true, d: true, mRoundUp: false }

  const inputDate = new Date(dateString)

  if (isNaN(inputDate.getTime())) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD')
  }

  const currentDate = new Date()


  let days = currentDate.getDate() - inputDate.getDate()
  let months = options.mRoundUp && days > 7 ? currentDate.getMonth() - inputDate.getMonth() +1 : currentDate.getMonth() - inputDate.getMonth()
  let years = months === 12 ? currentDate.getFullYear() - inputDate.getFullYear() +1 : currentDate.getFullYear() - inputDate.getFullYear()

  if (days < 0) {
    const lastDayOfPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate()

    days += lastDayOfPrevMonth
    months--
  }

  if (months < 0) {
    years--
    months += 12
  }

  const parts = []
  if (options.y && years > 0) parts.push(`${years}${years === 1 ? 'yr' : 'yrs'}`)
  if (options.m && months > 0) parts.push(`${months}mos`)
  if (options.d) parts.push(`${days}days`)

  return parts.join(' ')
}