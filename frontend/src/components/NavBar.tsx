import { Link } from 'react-router-dom';
import '../App.css'

function NavBar() {
  return (
    <nav className="bg-gray-900 flex justify-between items-center p-4">
      <img src="./public/logo-vertical.png" className="w-40 h-14"></img>
      <div className="w-80 m-auto">
        <Link to="/" className="font-semibold text-white cursor-pointer mr-10">Home</Link>
        <Link to="admin" className="font-semibold text-white cursor-pointer">Gerenciar</Link>
      </div>
    </nav>
  );
}


export default NavBar
