import { on } from './utils'

// fading in the document's body on first load
// on every 10th refresh of the same page
// or after 5+ minutes of not using the website
on(document, 'DOMContentLoaded', () => {
  const defaultData = {
    time: new Date().getTime(),
    lastPath: location.pathname,
    refreshCount: 0,
    firstLoad: false
  }

  const currentLoadData = JSON.parse(localStorage.getItem('loadData')) || {...defaultData, firstLoad: true}

  if (
    !currentLoadData.firstLoad &&
    (currentLoadData.lastPath !== location.pathname || (new Date().getTime() - currentLoadData.time < 300000 && currentLoadData.refreshCount < 9))
  ) {
    document.body.style.setProperty('transition-duration', '0s')
    const newLoadData = currentLoadData.lastPath !== location.pathname ?
      defaultData
        : {...defaultData, refreshCount: currentLoadData.refreshCount+1}

    localStorage.setItem('loadData', JSON.stringify(newLoadData))
  } else {
    document.body.style.setProperty('transition-duration', '.7s')
    localStorage.setItem('loadData', JSON.stringify(defaultData))
  }

  document.body.style.setProperty('opacity', '100')
})