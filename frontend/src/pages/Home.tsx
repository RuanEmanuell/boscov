import { useEffect, useState } from 'react';
import Filme from '../components/Filme';
import NavBar from '../components/NavBar';
import { FilmeType } from '../types/Filme';

function Home() {
  const [filmes, setFilmes] = useState<FilmeType[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/filmes') 
      .then((res) => res.json())
      .then((data) => setFilmes(data))
      .catch((err) => console.error('Erro ao buscar filmes:', err));
  }, []);

  const filmesFiltrados = filmes.filter((filme) => 
    filme.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <NavBar />
      <h1 className="font-bold text-5xl text-white text-center mt-8">Filmes</h1>

      <div className="flex justify-center mt-6">
        <input 
          type="text"
          placeholder="Pesquisar filmes..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="p-2 rounded-lg w-full max-w-lg mx-10 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 px-4 py-8">
        {filmesFiltrados.length > 0 ? (
          filmesFiltrados.map((filme) => (
            <Filme
              key={filme.id}
              nome={filme.nome}
              anoLancamento={filme.anoLancamento}
              poster={filme.poster}
              classificacao={filme.classificacao}
              duracao={`${filme.duracao} min`}
              produtora={filme.produtora}
            />
          ))
        ) : (
          <p className="text-white text-xl mt-8">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
