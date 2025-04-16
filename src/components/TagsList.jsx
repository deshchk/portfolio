import { useEffect, useRef } from "preact/hooks"
import { off, on } from "@scripts/utils"

export default function TagsList({ tags }) {
  const tagList = useRef(null)
  const pos = useRef({
    top: 0, left: 0, x: 0, y: 0
  })

  useEffect(() => {
    function handleMove(e) {
      const dx = e.clientX - pos.current.x
      const dy = e.clientY - pos.current.y

      tagList.current.scrollTop = pos.current.top - dy
      tagList.current.scrollLeft = pos.current.left - dx
    }

    function handleEnd() {
      tagList.current.style.cursor = 'grab'
      tagList.current.style.removeProperty('user-select')

      off(document, 'mousemove', handleMove)
      off(document, 'mouseup', handleEnd)
    }

    on(tagList.current, 'mousedown', e => {
      pos.current = {
        left: tagList.current.scrollLeft,
        top: tagList.current.scrollTop,
        x: e.clientX,
        y: e.clientY
      }

      tagList.current.style.cursor = 'grabbing'
      tagList.current.style.userSelect = 'none'

      on(document, 'mousemove', handleMove)
      on(document, 'mouseup', handleEnd)
    })
  }, [])

  return (
    <ul
      ref={tagList}
      className="[container-type:inline-size] group flex gap-x-2 text-xs overflow-auto invisible-scroll mt-auto pr-12 cursor-grab mask-r-from-black mask-r-from-80% mask-r-to-transparent focus:outline-none pointer-events-auto"
    >
      {tags.map(tag => (
        <li className={`shrink-0 px-2.5 py-0.5 ${tag === 'eol' ? 'uppercase bg-purple text-white group-focus:bg-purple-dark' : 'bg-green-light/60 group-focus:bg-green-light'} rounded-full select-none`}>{tag}</li>
      ))}
    </ul>
  )
}