import { useState, useEffect } from 'react';
import '../App.css';
import { FilmeType, GeneroType } from '../types/types';
import { X } from 'lucide-react';

function Filme({ nome, anoLancamento, poster, classificacao, duracao, produtora, generos }: FilmeType & { generos: any[] }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [generosDetalhados, setGenerosDetalhados] = useState<GeneroType[]>([]);

  useEffect(() => {
    if (mostrarModal && generos.length > 0) {
      Promise.all(
        generos.map((genero) =>
          fetch(`http://localhost:3001/generos/${genero['idGenero']}`).then((res) => res.json())
        )
      )
        .then((dataArray) => setGenerosDetalhados(dataArray))
        .catch(() => setGenerosDetalhados([]));
    }
  }, [mostrarModal, generos]);


  return (
    <>
      <div
        className="max-w-xs w-full m-4 text-center hover:rounded hover:border-2 hover:border-gray-700 cursor-pointer hover:bg-gray-900 transition-all p-2"
        onClick={() => setMostrarModal(true)}
      >
        <img src={poster} alt={nome} className="w-5/6 mx-auto h-3/4 rounded-lg shadow-lg" />
        <h2 className="font-bold text-xl text-white mt-2">{nome} ({anoLancamento})</h2>
        <div className="flex flex-row justify-center items-center mt-2 flex-wrap gap-2 text-sm text-gray-300">
          <span>{duracao}</span>
          <span>-</span>
          <div className="border-white border-2 h-8 w-8 rounded text-white font-bold flex items-center justify-center">
            {classificacao}
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500 cursor-pointer"
              onClick={() => setMostrarModal(false)}
            >
              <X size={28} />
            </button>

            <img
              src={poster}
              alt={nome}
              className="w-full md:w-1/2 h-auto rounded-lg object-cover"
            />

            <div className="flex flex-col justify-center text-white gap-4">
              <h2 className="font-bold text-3xl">{nome}</h2>
              <p className="text-gray-300">Ano: {anoLancamento}</p>
              <p className="text-gray-300">Duração: {duracao}</p>
              <p className="text-gray-300">Produtora: {produtora}</p>
              <div className="flex flex-row items-center">
                <p className="text-gray-300">Classificação:</p>
                <div className="border-white border-2 h-10 w-10 rounded text-white font-bold flex items-center justify-center ml-4">
                  {classificacao}
                </div>
              </div>

              {generosDetalhados.length > 0 && (
                <div className="flex flex-wrap">
                  <p className="text-gray-300">Gêneros:</p>
                  {generosDetalhados.map((genero) => (
                    <span key={genero.id} className="bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs mx-2">
                      {genero.descricao}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filme;
