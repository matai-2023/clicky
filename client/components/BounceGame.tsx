/* eslint-disable jsx-a11y/media-has-caption */
import GameOver from './GameOver'
import { Link } from 'react-router-dom'
import Circle from './shapes/Circle'
import Square from './shapes/Square'
import Triangle from './shapes/Triangle'
import Explode from './Explode'
import useGame from './hooks/useGame'

function BounceGame() {
  const { states, effects, clicks, audio } = useGame()
  return (
    <>
      <div className="flex justify-center items-center">
        <Link
          to="/catagory"
          className="text-6xl m-4 text-primary font-bold animate-bounce"
        >
          Bounce!
        </Link>
      </div>
      <div>
        <audio ref={audio.audioRef}>
          <source src="../../src/click.wav" type="audio/mpeg" />
          <p>Your browser does not support the audio element.</p>
        </audio>
      </div>
      {!states.start.state ? (
        <div className="flex justify-center items-center h-screen">
          <button
            className="border-4 rounded text-5xl font-bold text-primary border-primary px-48 py-24 hover:bg-pink2 hover:text-pink3 animate-bounce"
            onClick={clicks.handleStartClick}
          >
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center p-2 m-4 items-center text-3xl">
            <Link
              className="align-start border-4 border-primary px-4 rounded text-primary hover:bg-pink2 hover:text-pink3 animate-bounce"
              to="/catagory"
            >
              Go Back
            </Link>
            <h2 className="text-center flex-grow animate-bounce">
              Time: {states.num.state}
            </h2>
            <h2 className="ml-auto animate-bounce">
              Score: {states.count.state}
            </h2>
          </div>
          {states.num.state !== 0 ? (
            <>
              <div className="flex justify-center items-center p-2">
                <svg
                  viewBox={`0 0 300 ${states.screenSize.state.height}`}
                  className="border-4 border-primary m-8 animate-bounce"
                  onClick={clicks.handleMissClick}
                >
                  <Square
                    x={states.squareXY.state[0]}
                    y={states.squareXY.state[1]}
                    size={20}
                    handleClick={clicks.handleSquareClick}
                    className={'animate-bounce'}
                  />
                  <Circle
                    x={states.circleXY.state[0]}
                    y={states.circleXY.state[1]}
                    radius={10}
                    handleCircleClick={clicks.handleCircleClick}
                    className={'animate-bounce'}
                  />
                  <Triangle
                    x={states.triangleXY.state[0]}
                    y={states.triangleXY.state[1]}
                    sideLength={20}
                    handleTriangleClick={clicks.handleTriangleClick}
                    className={'animate-bounce'}
                  />
                </svg>
                {states.isExploding.state && (
                  <Explode
                    x={states.explosionPosition.state[0] - 100}
                    y={states.explosionPosition.state[1] - 100}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-20 justify-center items-center border-4 border-primary p-36 m-36 text-center text-3xl animate-bounce">
              <GameOver score={states.count.state} />
              <button
                className="border-4 rounded text-5xl font-bold text-primary border-primary px-24 py-18 hover:bg-pink2 hover:text-pink3 animate-bounce"
                onClick={() => window.location.reload()}
              >
                Restart
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default BounceGame
