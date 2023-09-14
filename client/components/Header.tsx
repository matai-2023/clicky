import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className="flex justify-center items-center gap-80">
        <img className="w-64 h-full" src="images/gun.png" alt="gun" />
        <Link to="/" className="text-8xl m-4 text-primary font-bold">
          Blicky
        </Link>
        <img
          className="w-64 h-full transform -scale-x-100"
          src="images/gun.png"
          alt="gun"
        />
      </div>
      <hr className="border-4 border-primary" />
    </>
  )
}
export default Header