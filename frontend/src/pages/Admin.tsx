import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Edit, Trash } from 'lucide-react';

interface Genero {
  id: number;
  descricao: string;
}

interface Filme {
  id: number;
  nome: string;
  diretor: string;
  anoLancamento: number;
  duracao: number;
  produtora: string;
  classificacao: string;
  poster: string;
  generos: number[];
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
  const [listaFilmes, setListaFilmes] = useState<Filme[]>([]);

  const [descricaoGenero, setDescricaoGenero] = useState("");

  const [editandoGenero, setEditandoGenero] = useState<Genero | null>(null);
  const [editandoFilme, setEditandoFilme] = useState<Filme | null>(null);

  useEffect(() => {
    carregarGeneros();
    carregarFilmes();
  }, []);

  const carregarGeneros = () => {
    fetch("http://localhost:3001/generos")
      .then(res => res.json())
      .then(data => setListaGeneros(data))
      .catch(err => console.error("Erro ao carregar gêneros:", err));
  };

  const carregarFilmes = () => {
    fetch("http://localhost:3001/filmes")
      .then(res => res.json())
      .then(data => setListaFilmes(data))
      .catch(err => console.error("Erro ao carregar filmes:", err));
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedIds = selectedOptions.map(option => Number(option.value));
    setGeneros(selectedIds);
  };

  const resetFilmeForm = () => {
    setNome("");
    setDiretor("");
    setAnoLancamento('');
    setDuracao('');
    setProdutora("");
    setClassificacao("");
    setPoster("");
    setGeneros([]);
    setEditandoFilme(null);
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
      const response = await fetch(`http://localhost:3001/filmes${editandoFilme ? `/${editandoFilme.id}` : ''}`, {
        method: editandoFilme ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filme)
      });

      if (!response.ok) throw new Error("Erro ao salvar filme");

      alert(`Filme ${editandoFilme ? "atualizado" : "adicionado"} com sucesso!`);
      resetFilmeForm();
      carregarFilmes();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar filme");
    }
  };

  const handleEditarFilme = (filme: Filme) => {
    setEditandoFilme(filme);
    setNome(filme.nome);
    setDiretor(filme.diretor);
    setAnoLancamento(filme.anoLancamento);
    setDuracao(filme.duracao);
    setProdutora(filme.produtora);
    setClassificacao(filme.classificacao);
    setPoster(filme.poster);
    setGeneros(filme.generos);
  };

  const handleExcluirFilme = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este filme?")) return;
    try {
      const res = await fetch(`http://localhost:3001/filmes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir filme");
      carregarFilmes();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir filme");
    }
  };

  const handleSubmitGenero = async (e: React.FormEvent) => {
    e.preventDefault();

    const genero = { descricao: descricaoGenero };

    try {
      const response = await fetch(`http://localhost:3001/generos${editandoGenero ? `/${editandoGenero.id}` : ''}`, {
        method: editandoGenero ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genero)
      });

      if (!response.ok) throw new Error("Erro ao salvar gênero");

      alert(`Gênero ${editandoGenero ? "atualizado" : "adicionado"} com sucesso!`);
      setDescricaoGenero("");
      setEditandoGenero(null);
      carregarGeneros();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar gênero");
    }
  };

  const handleEditarGenero = (genero: Genero) => {
    setEditandoGenero(genero);
    setDescricaoGenero(genero.descricao);
  };

  const handleExcluirGenero = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este gênero?")) return;
    try {
      const res = await fetch(`http://localhost:3001/generos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir gênero");
      carregarGeneros();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir gênero");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <NavBar />
      <h1 className="font-bold text-5xl text-white text-center mt-8">Gerenciar</h1>

      <form onSubmit={handleSubmitFilme} className="max-w-md mx-auto mt-10 p-4 bg-gray-700 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-white">{editandoFilme ? "Editar Filme" : "Adicionar Filme"}</h2>

        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="Diretor" value={diretor} onChange={(e) => setDiretor(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="number" placeholder="Ano de Lançamento" value={anoLancamento} onChange={(e) => setAnoLancamento(e.target.valueAsNumber)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="number" placeholder="Duração (minutos)" value={duracao} onChange={(e) => setDuracao(e.target.valueAsNumber)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="Produtora" value={produtora} onChange={(e) => setProdutora(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="Classificação" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />
        <input type="text" placeholder="URL do Poster" value={poster} onChange={(e) => setPoster(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />

        <label className="block text-white font-bold">Gêneros</label>
        <select multiple value={generos.map(String)} onChange={handleGeneroChange} className="w-full p-2 rounded border-2 border-white text-white">
          {listaGeneros.map((genero) => (
            <option key={genero.id} value={genero.id}>{genero.descricao}</option>
          ))}
        </select>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-500 transition cursor-pointer">
          {editandoFilme ? "Salvar Alterações" : "Adicionar Filme"}
        </button>
      </form>

      <div className="max-w-md mx-auto mt-5 space-y-2">
        {listaFilmes.map(filme => (
          <div key={filme.id} className="flex justify-between items-center bg-gray-700 p-2 rounded text-white">
            <span>{filme.nome}</span>
            <div className="space-x-2">
              <button onClick={() => handleEditarFilme(filme)} className="bg-yellow-500 p-2 rounded"><Edit/></button>
              <button onClick={() => handleExcluirFilme(filme.id)} className="bg-red-500 p-2 rounded"><Trash/></button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitGenero} className="max-w-md mx-auto mt-10 p-4 bg-gray-700 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-white">{editandoGenero ? "Editar Gênero" : "Adicionar Gênero"}</h2>

        <input type="text" placeholder="Descrição do Gênero" value={descricaoGenero} onChange={(e) => setDescricaoGenero(e.target.value)} className="w-full p-2 rounded border-2 border-white text-white" required />

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-500 transition cursor-pointer">
          {editandoGenero ? "Salvar Alterações" : "Adicionar Gênero"}
        </button>
      </form>

      <div className="max-w-md mx-auto mt-5 space-y-2">
        {listaGeneros.map(genero => (
          <div key={genero.id} className="flex justify-between items-center bg-gray-700 p-2 rounded text-white">
            <span>{genero.descricao}</span>
            <div className="space-x-2">
              <button onClick={() => handleEditarGenero(genero)} className="bg-yellow-500 p-2 rounded"><Edit/></button>
              <button onClick={() => handleExcluirGenero(genero.id)} className="bg-red-500 p-2 rounded"><Trash/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
