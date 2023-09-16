interface Props {
  x: number
  y: number
  sideLength: number
  handleTriangleClick: (e: React.MouseEvent<SVGPolygonElement>) => void
  className: string
}
function Triangle(props: Props) {
  const side = props.sideLength
  const x = props.x
  const y = props.y
  const b = Math.floor(Math.sqrt(Math.pow(side, 2) - Math.pow(side / 2, 2)))
  const x1 = side / 2 + x
  const y1 = side - b + y
  const x2 = side + x
  const y2 = side + y
  const x3 = 0 + x
  const y3 = side + y
  return (
    <svg style={{ overflow: 'visible', position: 'absolute' }}>
      <polygon
        data-testid="triangle-polygon"
        role="img"
        points={`${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`}
        onClick={props.handleTriangleClick}
        className={props.className}
      ></polygon>
    </svg>
  )
}

export default Triangle
