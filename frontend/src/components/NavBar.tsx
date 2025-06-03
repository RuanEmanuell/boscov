import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import '../App.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioString = localStorage.getItem('usuario');

    setIsLoggedIn(!!token);

    if (usuarioString) {
      try {
        const usuario = JSON.parse(usuarioString);
        setTipoUsuario(usuario.tipoUsuario);
      } catch (e) {
        console.error('Erro ao fazer parse do usuário:', e);
        setTipoUsuario(null);
      }
    }
  }, []); 

  return (
    <>
      <nav className="bg-gray-900 flex justify-between items-center p-3">
        <img src="./public/logo-vertical.png" className="w-24 h-10" alt="Logo" />

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="font-medium text-white hover:text-gray-300 transition">
            Home
          </Link>

          {tipoUsuario === 'A' && (
            <Link to="/admin" className="font-medium text-white hover:text-gray-300 transition">
              Gerenciar
            </Link>
          )}

          {!isLoggedIn ? (
            <Link to="/login" className="font-medium text-white hover:text-gray-300 transition">
              Login
            </Link>
          ) : (
            <Link to="/usuario" className="text-white hover:text-gray-300 transition">
              <User size={24} />
            </Link>
          )}
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

            {tipoUsuario === 'A' && (
              <Link
                to="/admin"
                className="text-white text-lg hover:text-gray-300 transition"
                onClick={toggleMenu}
              >
                Gerenciar
              </Link>
            )}

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-white text-lg hover:text-gray-300 transition"
                onClick={toggleMenu}
              >
                Login
              </Link>
            ) : (
              <Link
                to="/usuario"
                className="text-white text-lg hover:text-gray-300 transition"
                onClick={toggleMenu}
              >
                <User size={24} />
              </Link>
            )}
          </div>

          <div className="flex-1" onClick={toggleMenu}></div>
        </div>
      )}
    </>
  );
}

export default NavBar;
