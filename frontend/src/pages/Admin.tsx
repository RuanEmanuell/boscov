import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

interface Genero {
  id: number;
  descricao: string;
}

function Admin() {
  const [nome, setNome] = useState("");
  const [diretor, setDiretor] = useState("");
  const [anoLancamento, setAnoLancamento] = useState<number | ''>('');
  const [duracao, setDuracao] = useState<number | ''>('');
  const [produtora, setProdutora] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [poster, setPoster] = useState("");
  const [generos, setGeneros] = useState<number[]>([]);
  const [listaGeneros, setListaGeneros] = useState<Genero[]>([]);

  const [descricaoGenero, setDescricaoGenero] = useState("");

  useEffect(() => {
    carregarGeneros();
  }, []);

  const carregarGeneros = () => {
    fetch("http://localhost:3001/generos")
      .then((res) => res.json())
      .then((data) => setListaGeneros(data))
      .catch((err) => console.error("Erro ao carregar gêneros:", err));
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedIds = selectedOptions.map((option) => Number(option.value));
    setGeneros(selectedIds);
  };

  const handleSubmitFilme = async (e: React.FormEvent) => {
    e.preventDefault();

    const filme = {
      nome,
      diretor,
      anoLancamento: Number(anoLancamento),
      duracao: Number(duracao),
      produtora,
      classificacao,
      poster,
      generos
    };

    try {
      const response = await fetch("http://localhost:3001/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filme)
      });

      if (!response.ok) throw new Error("Erro ao adicionar filme");

      alert("Filme adicionado com sucesso!");

      setNome("");
      setDiretor("");
      setAnoLancamento('');
      setDuracao('');
      setProdutora("");
      setClassificacao("");
      setPoster("");
      setGeneros([]);

    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar filme");
    }
  };

  const handleSubmitGenero = async (e: React.FormEvent) => {
    e.preventDefault();

    const genero = { descricao: descricaoGenero };

    try {
      const response = await fetch("http://localhost:3001/generos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero)
      });

      if (!response.ok) throw new Error("Erro ao adicionar gênero");

      alert("Gênero adicionado com sucesso!");
      setDescricaoGenero("");
      carregarGeneros();  

    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar gênero");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <NavBar />
      <h1 className="font-bold text-5xl text-white text-center mt-8">Gerenciar</h1>

      {/* Formulário de Filme */}
      <form onSubmit={handleSubmitFilme} className="max-w-md mx-auto mt-10 p-4 bg-gray-700 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-white">Adicionar Filme</h2>

        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white border-2 border-white" required />
        <input type="text" placeholder="Diretor" value={diretor} onChange={(e) => setDiretor(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="number" placeholder="Ano de Lançamento" value={anoLancamento} onChange={(e) => setAnoLancamento(e.target.valueAsNumber)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="number" placeholder="Duração (minutos)" value={duracao} onChange={(e) => setDuracao(e.target.valueAsNumber)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="Produtora" value={produtora} onChange={(e) => setProdutora(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="Classificação" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="URL do Poster" value={poster} onChange={(e) => setPoster(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white text-white" required />

        <label className="block text-white font-bold">Gêneros</label>
        <select multiple value={generos.map(String)} onChange={handleGeneroChange} className="w-full p-2 rounded border-2 border-white text-white">
          {listaGeneros.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.descricao}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 rounded hover:bg-gray-500 transition cursor-pointer">
          Adicionar Filme
        </button>
      </form>

      {/* Formulário de Gênero */}
      <form onSubmit={handleSubmitGenero} className="max-w-md mx-auto mt-10 p-4 bg-gray-700 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-white">Adicionar Gênero</h2>

        <input type="text" placeholder="Descrição do Gênero" value={descricaoGenero} onChange={(e) => setDescricaoGenero(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />

        <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 rounded hover:bg-gray-500 transition cursor-pointer">
          Adicionar Gênero
        </button>
      </form>
    </div>
  );
}

export default Admin;
