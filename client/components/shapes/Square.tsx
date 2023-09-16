interface Props {
  x: number
  y: number
  size: number
  handleClick: (e: React.MouseEvent<SVGRectElement>) => void
  className: string
}

function Square(props: Props) {
  return (
    <svg style={{ overflow: 'visible', position: 'absolute' }}>
      <rect
        data-testid="square-rect"
        role="img"
        x={0}
        y={0}
        width={props.size}
        height={props.size}
        onClick={props.handleClick}
        className={props.className}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          dur="0.8s"
          values={`${props.x},${props.y};${props.x - 10},${props.y - 10};${
            props.x
          },${props.y};${props.x + 10},${props.y + 10};${props.x},${props.y}`}
          repeatCount="indefinite"
        ></animateTransform>
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="scale"
          dur="0.8s"
          values="1; 2; 1; 0; 1"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </svg>
  )
}

export default Square
