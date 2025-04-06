import {useState, useRef, useEffect} from "preact/hooks"
import { useOutsideClick } from "@scripts/hooks/useOutsideClick"
import NavigationItem from "@components/NavigationItem"
import Logo from "@components/Logo"

export default function NavigationList({ paths, breakAt }) {
  const wrapper = useRef(null)
  const [burgerOpen, setBurgerOpen] = useState(false)

  function toggleBurger() {
    setBurgerOpen(prev => !prev)
  }

  useOutsideClick(() => {setBurgerOpen(false)}, wrapper)

  return (
    <div className="w-full" ref={wrapper}>
      <div className="w-full flex items-center justify-between">
        <a href="/" className="sm:hidden text-green-darker p-1 outline-0 outline-green-darkest outline-dashed focus:outline-1 hover:text-green-darkest focus:text-green-darkest">
          <Logo className="size-12 transition-all duration-300" />
        </a>

        <button
        className={`
          group sm:hidden flex flex-col justify-center gap-2 aspect-square cursor-pointer p-2
          outline-0 outline-green-darkest outline-dashed focus:outline-1 transition-all
          ${burgerOpen ? '-rotate-45 outline-1' : 'rotate-0'}
        `}
        onClick={toggleBurger}
      >
        <span className={`
          relative h-1.5 w-10 bg-green-darker pointer-events-none group-hover:bg-green-darkest group-focus:bg-green-darkest
          [transition:left_.35s_cubic-bezier(0.4,0,0.2,1),_background-color_.15s_cubic-bezier(0.4,0,0.2,1)]
          ${burgerOpen ? '-left-6.5' : 'left-0'}
        `} />
        <span className={`
          relative h-1.5 w-10 bg-green-darker pointer-events-none group-hover:bg-green-darkest group-focus:bg-green-darkest
          [transition:left_.3s_cubic-bezier(0.4,0,0.2,1),_background-color_.4s_cubic-bezier(0.4,0,0.2,1)]
          ${burgerOpen ? '-left-3' : 'left-0'}
        `} />
        <span className={`
          h-1.5 w-10 bg-green-darker pointer-events-none group-hover:bg-green-darkest group-focus:bg-green-darkest
          [transition:background-color_.7s_cubic-bezier(0.4,0,0.2,1)]
        `} />
      </button>
      </div>

      <div className={`
        max-sm:grid w-full transition-all
        ${burgerOpen ? 'grid-rows-[1fr] max-sm:mt-8' : 'grid-rows-[0fr] mt-0'}
      `}>
        <nav className={`
          flex justify-between items-center gap-6 max-sm:flex-col max-sm:px-1 max-sm:overflow-hidden
          ${burgerOpen ? 'max-sm:pb-1' : 'pb-0'}
        `}>
          <ul className="max-sm:w-full grid gap-6 sm:grid-cols-[repeat(2,100px)]">
            {paths.filter(path => path.id < breakAt).map(path => (
              <NavigationItem data={path} open={burgerOpen} key={path.id} />
            ))}
          </ul>

          <a href="/" className="max-sm:hidden text-green-darker p-1 outline-0 outline-green-darkest outline-dashed focus:outline-1 hover:text-green-darkest focus:text-green-darkest">
            <Logo className="size-11 transition-all duration-300"/>
          </a>

          <ul className="max-sm:w-full grid gap-6 sm:grid-cols-[repeat(2,100px)]">
            {paths.filter(path => path.id >= breakAt).map(path => (
              <NavigationItem data={path} open={burgerOpen} key={path.id} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}