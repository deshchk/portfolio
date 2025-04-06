import { useEffect, useRef } from "preact/hooks"

export default function NavigationItem({ data, open }) {
  const el = useRef(null)

  useEffect(() => {
    if (location.pathname === data.path) el.current.classList.add('active')
  }, [])

  return (
    <li className="relative group flex flex-col gap-y-1.5 text-center" ref={el}>
      <a href={data.path} class="py-2 group-[.active]:text-white focus:!text-darkest focus:outline-none" tabIndex={open ? 0 : -1}>{data.name}</a>

      <div className="absolute inset-0 grid grid-cols-[0fr] group-[.active]:grid-cols-[1fr] transition-[grid-template-columns_.2s_ease-in-out] pointer-events-none -z-1">
        <div className="absolute inset-0 border border-dashed border-darkest opacity-0 group-has-focus:opacity-100">
          <div className="absolute top-1/2 -translate-y-1/2 left-1.5 group-[&:not(.active)]:hidden size-2 bg-darkest rounded-full" />
        </div>
        <div className="size-full bg-purple-dark group-has-focus:bg-green-light overflow-hidden"/>
      </div>

      <div className="absolute inset-0 bg-green-light/35 group-hover:bg-green-light group-has-focus:bg-green-light -z-2 transition-all"/>
    </li>
  )
}