import { useEffect, useState, useRef } from 'preact/hooks'
import { on } from "@scripts/utils"

export default function Greeting({ messages }) {
  const timeout = useRef(null)
  const nextWidth = useRef(0)

  const currentGreeting = useRef(null)
  const nextGreeting = useRef(null)
  const greetingWrapper = useRef(null)
  const hand = useRef(null)

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))]

  const [greetings, setGreetings] = useState([randomMessage(), messages[0]])
  const [greetingSwap, setGreetingSwap] = useState(false)

  function setNewGreeting() {
    setGreetings(prev => {
      let newMsg
      do {
        newMsg = randomMessage()
      } while (newMsg === prev[0])
      return prev.toSpliced(1,1).toSpliced(0, 0, newMsg)
    })
  }

  function waveHand() {
    hand.current.classList.add('waving')
    setTimeout(() => {
      hand.current.classList.remove('waving')
    }, 1050)
  }

  function changeGreeting() {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    setGreetingSwap(true)
    greetingWrapper.current.style.setProperty('grid-template-columns', `${nextWidth.current+1}px auto`)
    setTimeout(() => {
      setNewGreeting()
      waveHand()
      setGreetingSwap(false)
    }, 300)
  }

  useEffect(() => {
    timeout.current = setTimeout(() => {
      changeGreeting()
    }, 5000)

    return () => clearTimeout(timeout.current)
  }, [greetings])

  useEffect(() => {
    if (!greetingSwap) {
      nextWidth.current = nextGreeting.current.clientWidth
    }
  }, [greetingSwap])

  useEffect(() => {
    on(window, 'resize', () => {
      nextWidth.current = nextGreeting.current.clientWidth
      greetingWrapper.current.style.setProperty('grid-template-columns', `${currentGreeting.current.clientWidth+1}px auto`)
    })
  }, [])

  return (
    <button
      className="greeting-button grid font-ms text-2xl sm:text-3xl font-bold p-2 outline-0 outline-green-dark outline-dashed focus:outline-1"
      ref={greetingWrapper}
      onClick={changeGreeting}
      style={{
        cursor: greetingSwap ? 'none' : 'grab',
        transition: 'grid-template-columns .3s ease-in-out'
      }}
    >
        <span className="relative inline-flex overflow-hidden">
          <span
            ref={nextGreeting}
            className="absolute text-nowrap"
            style={{
              transform: greetingSwap ? 'translateY(0)' : 'translateY(-110%)',
              transition: greetingSwap ? 'transform .25s ease-in-out' : 'none'
            }}
          >
            {greetings[0]}
          </span>
          <span
            ref={currentGreeting}
            className="text-nowrap"
            style={{
              transform: greetingSwap ? 'translateY(110%)' : 'translateY(0)',
              transition: greetingSwap ? 'transform .25s ease-in-out' : 'none'
            }}
          >
            {greetings[1]}
          </span>
        </span>
        <span>
          , I'm Daniel!
          <span className="inline-block relative -top-0.5 ml-5 [.waving]:motion-safe:animate-[waving_1s_ease-in-out]" ref={hand}>
            👋
          </span>
        </span>
    </button>
  )
}