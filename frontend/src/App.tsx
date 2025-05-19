import './App.css';
import Filme from './components/Filme';
import NavBar from './components/NavBar';

function App() {
  return (
<div className="bg-gray-800 min-h-screen w-full">
      <NavBar />
      <h1 className="font-bold text-5xl text-white text-center mt-8">Filmes</h1>
      <div className="flex flex-wrap justify-center gap-4 px-4 py-8">
        <Filme
          nome="Vingadores: Ultimato"
          ano={2019}
          imagem="./public/vingadores.jpg"
          classificacao={12}
          duracao="3h1m"
          produtora="Marvel Studios"
        />
        <Filme
          nome="Vingadores: Ultimato"
          ano={2019}
          imagem="./public/vingadores.jpg"
          classificacao={12}
          duracao="3h1m"
          produtora="Marvel Studios"
        />
        <Filme
          nome="Vingadores: Ultimato"
          ano={2019}
          imagem="./public/vingadores.jpg"
          classificacao={12}
          duracao="3h1m"
          produtora="Marvel Studios"
        />
        <Filme
          nome="Vingadores: Ultimato"
          ano={2019}
          imagem="./public/vingadores.jpg"
          classificacao={12}
          duracao="3h1m"
          produtora="Marvel Studios"
        />
      </div>
    </div>
  );
}

export default App;
