import { useState } from 'react'

interface Props {
  x: number
  y: number
  size: number
}

function getRandom() {
  return Math.floor(Math.random() * 100)
}

function Square(props: Props) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function handleClick() {
    setX(getRandom())
    setY(getRandom())
  }

  return (
    <svg>
      <rect
        x={x}
        y={y}
        width={props.size}
        height={props.size}
        onClick={handleClick}
      ></rect>
    </svg>
  )
}

export default Square
