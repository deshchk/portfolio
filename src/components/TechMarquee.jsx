import { useEffect, useRef } from "preact/hooks"
import { on } from "@scripts/utils"
import Swiper from 'swiper'
import { Autoplay, A11y, FreeMode } from 'swiper/modules'
import 'swiper/css'

export default function TechMarquee() {
  const wrapper = useRef(null)

  const swiper = new Swiper('.swiper', {
    modules: [Autoplay, A11y, FreeMode],
    direction: 'horizontal',
    loop: true,
    speed: 2000,
    autoplay: {delay: 0},
    freeMode: {enabled: true},
    grabCursor: true,
    slidesPerView: 'auto',
    breakpoints: {
      1028: {
        slidesOffsetBefore: 840,
        spaceBetween: 32,
      },
      768: {
        slidesOffsetBefore: 600,
        spaceBetween: 24,
      },
      640: {
        slidesOffsetBefore: 500,
        spaceBetween: 16,
      },
      0: {
        slidesOffsetBefore: 350,
        spaceBetween: 8,
      }
    },
  })

  const things = [
    {name: 'HTML', img: './logos/html.svg', url: 'https://html.spec.whatwg.org/multipage/'},
    {name: 'CSS', img: './logos/css.svg', url: 'https://www.w3.org/Style/CSS/Overview.en.html'},
    {name: 'Javascript', img: './logos/js.svg', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-262/'},
    {name: 'React', img: './logos/react.svg', url: 'https://react.dev/'},
    {name: 'TailwindCSS', img: './logos/tailwind.svg', url: 'https://www.w3.org/Style/CSS/Overview.en.html'},
    {name: 'Vue.js', img: './logos/vue.svg', url: 'https://vuejs.org/'},
    {name: 'Astro', img: './logos/astro.svg', url: 'https://astro.build/'},
    {name: 'Figma', img: './logos/figma.svg', url: 'https://www.figma.com/'},
    {name: 'Preact', img: './logos/preact.svg', url: 'https://preactjs.com/'},
    {name: 'Alpine.js', img: './logos/alpine.svg', url: 'https://alpinejs.dev/'},
    {name: 'Mithril.js', img: './logos/mithril.svg', url: 'https://mithril.js.org/'},
    {name: 'React Router', img: './logos/rrouter.svg', url: 'https://reactrouter.com/'},
    {name: 'PHP', img: './logos/php.svg', url: 'https://php.net/'},
    {name: 'Laravel', img: './logos/laravel.svg', url: 'https://laravel.com/'},
    {name: 'Git', img: './logos/git.svg', url: 'https://git-scm.com/'},
  ]

  useEffect(() => {
    swiper.init()
    on(window, 'resize', () => {
      swiper.update()
    })
  }, [])

  return (
    <div className="swiper w-11/12 sm:w-8/10 !py-3 sm:!py-6 bg-green-light rounded-xl inset-shadow-sm inset-shadow-green-darkest/40" ref={wrapper}>
      <div className="swiper-wrapper ![transition-timing-function:linear]">
        {things.map(thing => (
          <div className="swiper-slide !w-fit group relative p-4">
            <div className="absolute inset-0 grid place-items-center font-ms tracking-wider z-10 backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white/80 px-2 sm:px-4 py-1 rounded-md text-sm sm:text-base md:text-xl text-center shadow-sm shadow-green-darkest/50">{thing.name}</span>
            </div>
            <a href={thing.url} target="_blank">
              <img src={thing.img} alt={thing.name} className="size-18 sm:size-28 md:size-32 drop-shadow-sm drop-shadow-darkest/40" draggable={false} loading="lazy"/>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}