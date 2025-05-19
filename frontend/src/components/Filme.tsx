import '../App.css';

function Filme({ nome, ano, imagem, classificacao, duracao, produtora }: {
  nome: string,
  ano: number,
  imagem: string,
  classificacao: number,
  duracao: string,
  produtora: string
}) {
  return (
    <div className="max-w-xs w-full m-4 text-center hover:rounded hover:border-2 hover:border-gray-700 cursor-pointer hover:bg-gray-900 transition-all p-2">
      <img src={imagem} alt={nome} className="w-5/6 mx-auto h-auto rounded-lg shadow-lg" />
      <h2 className="font-bold text-xl text-white mt-2">{nome} ({ano})</h2>
      <div className="flex flex-row justify-center items-center mt-2 flex-wrap gap-2 text-sm text-gray-300">
        <span>{duracao}</span>
        <span>-</span>
        <span>{produtora}</span>
        <span>-</span>
        <div className="border-white border-2 h-8 w-8 rounded text-white font-bold flex items-center justify-center">
          {classificacao}
        </div>
      </div>
    </div>
  );
}

export default Filme;
