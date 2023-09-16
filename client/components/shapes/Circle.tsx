interface Props {
  x: number
  y: number
  radius: number
  handleCircleClick: (e: React.MouseEvent<SVGCircleElement>) => void
  className: string
}

//cy and cy need to be tweaked when we start displaying shapes in

function Circle(props: Props) {
  return (
    <svg style={{ overflow: 'visible', position: 'absolute' }}>
      <circle
        data-testid="circle-circle"
        role="img"
        cx={props.x + 5}
        cy={props.y + 5}
        r={props.radius}
        onClick={props.handleCircleClick}
        className={props.className}
      ></circle>
    </svg>
  )
}

export default Circle
