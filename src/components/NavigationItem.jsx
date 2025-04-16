import { useEffect, useRef, useState } from "preact/hooks"
import { on } from "@scripts/utils"

export default function NavigationItem({ data, open }) {
  const el = useRef(null)
  const [sm, setSm ] = useState(false)

  useEffect(() => {
    console.log(location.pathname, data.path)
    if (location.pathname === data.path) el.current.classList.add('active')
    function setBreakpoint() {
      if (window.innerWidth < 640) {
        setSm(true)
      } else {
        setSm(false)
      }
    }

    on(window, 'resize', () => {
      setBreakpoint()
    })
    setBreakpoint()
  }, [])

  return (
    <li className="relative group flex flex-col gap-y-1.5 text-center rounded" ref={el}>
      <a href={data.path} class="py-2 group-[.active]:text-white focus:!text-darkest focus:outline-none" tabIndex={!sm || open ? 0 : -1}>{data.name}</a>

      <div className="absolute inset-0 rounded grid grid-cols-[0fr] group-[.active]:grid-cols-[1fr] transition-[grid-template-columns_.2s_ease-in-out] pointer-events-none -z-1">
        <div className="absolute inset-0 rounded border border-dashed border-darkest opacity-0 group-has-focus:opacity-100">
          <div className="absolute top-1/2 -translate-y-1/2 left-1.5 group-[&:not(.active)]:hidden size-2 bg-darkest rounded-full" />
        </div>
        <div className="size-full rounded bg-purple-dark group-has-focus:bg-green-light overflow-hidden"/>
      </div>

      <div className="absolute inset-0 rounded bg-green-light/35 group-hover:bg-green-light group-has-focus:bg-green-light -z-2 transition-all"/>
    </li>
  )
}