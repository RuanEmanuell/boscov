import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react'; 

import '../App.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="bg-gray-900 flex justify-between items-center p-3">
        <img src="./public/logo-vertical.png" className="w-24 h-10" alt="Logo" />

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="font-medium text-white hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/admin" className="font-medium text-white hover:text-gray-300 transition">
            Gerenciar
          </Link>
          <Link to="/login" className="font-medium text-white hover:text-gray-300 transition">
            <User/>
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="w-64 bg-gray-900 h-full p-6 flex flex-col space-y-6">
            <button onClick={toggleMenu} className="self-end text-white">
              <X size={28} />
            </button>
            <Link
              to="/"
              className="text-white text-lg hover:text-gray-300 transition"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="text-white text-lg hover:text-gray-300 transition"
              onClick={toggleMenu}
            >
              Gerenciar
            </Link>
          </div>
          <div className="flex-1" onClick={toggleMenu}></div>
        </div>
      )}
    </>
  );
}

export default NavBar;
