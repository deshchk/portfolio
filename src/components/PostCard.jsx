import { on, off, formatDate, nbsp } from "@scripts/utils"
import { useEffect, useRef } from "preact/hooks"

export default function PostCard({ post, className }) {
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
    <figure className={`
      flex flex-col border border-green-dark rounded-lg overflow-clip shadow-lg shadow-green-light/20 ${className ? className : ''}
      outline-3 outline-offset-3 outline-transparent has-focus:outline-green hover:outline-green [transition:outline-color_.2s]
    `}>
      <a href={`/posts/${post.id}`} className="block shadow-lg shadow-darkest/15 outline-none">
        <img className="object-cover aspect-video" src={post.data.image.url} alt={post.data.image.alt} loading="lazy" />
      </a>
      <figcaption className="flex-1 flex flex-col gap-y-3.5 p-4">
        <div class="flex flex-col gap-1">
          <a href={`/posts/${post.id}`} className="font-ms font-semibold leading-[1.5] line-clamp-2 text-ellipsis outline-1 outline-dashed outline-offset-3 outline-transparent focus:outline-green-dark">
            {post.data.title}
          </a>
          <div className="flex justify-between text-sm">
            <span className="text-darkest/60">{formatDate(post.data.pubDate)}</span>
            <span>{post.rendered.metadata.frontmatter.minutesRead.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>
        <p className="text-sm leading-[1.5] text-pretty pb-1">
          {nbsp(post.data.description)}
        </p>
        <ul
          ref={tagList}
          className="[container-type:inline-size] group flex gap-x-2 text-xs overflow-auto invisible-scroll mt-auto pr-12 cursor-grab mask-r-from-black mask-r-from-80% mask-r-to-transparent focus:outline-none"
        >
          {post.data.tags.map(tag => (
            <li className="shrink-0 px-2.5 py-0.5 bg-green-light/60 rounded-full group-focus:bg-green-light">{tag}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}