import { useState, useEffect } from 'react';
import '../App.css';
import { FilmeType, GeneroType } from '../types/types';
import { X, Star } from 'lucide-react';

function Filme({ id, nome, anoLancamento, poster, classificacao, duracao, produtora, generos }: FilmeType & { generos: any[] }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalAvaliacao, setMostrarModalAvaliacao] = useState(false);
  const [generosDetalhados, setGenerosDetalhados] = useState<GeneroType[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [novaNota, setNovaNota] = useState<number>(0);
  const [novoComentario, setNovoComentario] = useState<string>('');
  const [mediaAvaliacao, setMediaAvaliacao] = useState<number | null>(null);

  useEffect(() => {
    if (mostrarModal && generos.length > 0) {
      Promise.all(
        generos.map((genero) =>
          fetch(`http://localhost:3001/generos/${genero['idGenero']}`).then((res) => res.json())
        )
      ).then((dataArray) => setGenerosDetalhados(dataArray));
    }
  }, [mostrarModal, generos]);

  useEffect(() => {
    if (mostrarModal) {
      fetch(`http://localhost:3001/avaliacoes/filme/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAvaliacoes(data);
          if (data.length > 0) {
            const media = data.reduce((acc: number, cur: any) => acc + cur.nota, 0) / data.length;
            setMediaAvaliacao(media);
          } else {
            setMediaAvaliacao(null);
          }
        });
    }
  }, [mostrarModal, id]);

  const handleAdicionarAvaliacao = async () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      alert('Usuário não logado!');
      return;
    }
    const avaliacao = {
      idUsuario: Number(JSON.parse(usuario).id),
      idFilme: id,
      nota: novaNota,
      comentario: novoComentario
    };

    try {
      const res = await fetch('http://localhost:3001/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(avaliacao),
      });

      if (!res.ok) throw new Error('Erro ao adicionar avaliação.');

      const novasAvaliacoes = await fetch(`http://localhost:3001/avaliacoes/filme/${id}`).then((res) => res.json());
      setAvaliacoes(novasAvaliacoes);
      if (novasAvaliacoes.length > 0) {
        const media = novasAvaliacoes.reduce((acc: number, cur: any) => acc + cur.nota, 0) / novasAvaliacoes.length;
        setMediaAvaliacao(media);
      } else {
        setMediaAvaliacao(null);
      }

      setNovaNota(0);
      setNovoComentario('');
      setMostrarModalAvaliacao(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderEstrelas = (nota: number) => (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < nota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="max-w-xs w-full m-4 text-center hover:rounded hover:border-2 hover:border-gray-700 cursor-pointer hover:bg-gray-900 transition-all p-2" onClick={() => setMostrarModal(true)} > <img src={poster} alt={nome} className="w-5/6 mx-auto h-3/4 rounded-lg shadow-lg" /> <h2 className="font-bold text-xl text-white mt-2">{nome} ({anoLancamento})</h2> <div className="flex flex-row justify-center items-center mt-2 flex-wrap gap-2 text-sm text-gray-300"> <span>{duracao}</span> <span>-</span> <div className="border-white border-2 h-8 w-8 rounded text-white font-bold flex items-center justify-center"> {classificacao} </div> </div> </div>
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

            <img src={poster} alt={nome} className="w-full md:w-1/2 h-auto rounded-lg object-cover" />

            <div className="flex flex-col text-white gap-4">
              <h2 className="font-bold text-3xl mr-2">{nome}</h2>
              <p className="text-gray-300">Ano: {anoLancamento}</p>
              <p className="text-gray-300">Duração: {duracao}</p>
              <p className="text-gray-300">Produtora: {produtora}</p>
              <div className="flex items-center">
                <p className="text-gray-300">Classificação:</p>
                <div className="border-white border-2 h-10 w-10 rounded flex items-center justify-center ml-4">
                  {classificacao}
                </div>
              </div>

              {generosDetalhados.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <p className="text-gray-300">Gêneros:</p>
                  {generosDetalhados.map((genero) => (
                    <span key={genero.id} className="bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs">
                      {genero.descricao}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-2xl">Avaliações:</h3>
                {avaliacoes.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {avaliacoes.map((a) => (
                      <div key={a.id} className="bg-gray-700 p-2 rounded-lg shadow">
                        <p className="text-gray-200 text-md font-bold">{a.usuario.nome}</p>
                        {renderEstrelas(a.nota)}
                        <p className="text-gray-200 text-sm">{a.comentario}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300">Nenhuma avaliação ainda.</p>
                )}
              </div>

              
              {mediaAvaliacao !== null && (
                  <div className="flex items-center">
                    <span className="mr-2 text-yellow-400">Média:</span>
                    <div className="flex">{renderEstrelas(Math.round(mediaAvaliacao))}</div>
                    <span className="ml-2 text-gray-300">({mediaAvaliacao.toFixed(1)})</span>
                  </div>
                )}

              <button
                onClick={() => setMostrarModalAvaliacao(true)}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Adicionar Avaliação
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalAvaliacao && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setMostrarModalAvaliacao(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-red-500"
              onClick={() => setMostrarModalAvaliacao(false)}
            >
              <X size={24} />
            </button>

            <h3 className="font-semibold text-white text-xl mb-4">Adicionar Avaliação</h3>

            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  onClick={() => setNovaNota(i + 1)}
                  className={`cursor-pointer ${i < novaNota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                />
              ))}
            </div>

            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Comentário"
              className="w-full p-2 rounded text-black mb-4 bg-white"
            />

            <button
              onClick={handleAdicionarAvaliacao}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filme;
