import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

type FormState = 'login' | 'cadastro';

export default function Login() {
    const navigate = useNavigate(); 

    const [form, setForm] = useState<FormState>('login');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const trocarForm = () => {
        setForm(form === 'login' ? 'cadastro' : 'login');
        setEmail('');
        setSenha('');
        setNome('');
        setApelido('');
        setDataNascimento('');
    };

    const submitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido');
            }

            const data = await response.json();

            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            localStorage.setItem('token', data.token);

            alert('Login realizado com sucesso!');

            navigate('/');  // ✅ redirecionamento funciona aqui agora

        } catch (err: any) {
            console.error(`Erro ao fazer login: ${err.message}`);
            alert('Erro ao fazer login: ' + err.message);
        }
    };

    const submitCadastro = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    apelido,
                    email,
                    dataNascimento,
                    senha
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido');
            }

            const usuarioCriado = await response.json();

            alert('Usuário criado com sucesso!');
            setNome('');
            setApelido('');
            setEmail('');
            setDataNascimento('');
            setSenha('');
            setForm('login');
        } catch (err: any) {
            console.error(`Erro ao cadastrar usuário: ${err.message}`);
        }
    };

    return (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center items-center px-4">
            <Link to="/">
                <img src="./public/logo.png" className="w-32 h-32 my-2" alt="Logo" />
            </Link>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white font-sans">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    {form === 'login' ? 'Entrar' : 'Cadastrar'}
                </h2>

                {form === 'login' ? (
                    <form onSubmit={submitLogin} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold cursor-pointer"
                        >
                            Entrar
                        </button>
                    </form>
                ) : (
                    <form onSubmit={submitCadastro} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <input
                            type="text"
                            placeholder="Apelido (opcional)"
                            value={apelido}
                            onChange={(e) => setApelido(e.target.value)}
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <input
                            type="date"
                            placeholder="Data de nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold cursor-pointer"
                        >
                            Cadastrar
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-gray-300">
                    {form === 'login' ? (
                        <>
                            Não tem uma conta?{' '}
                            <button
                                onClick={trocarForm}
                                className="text-blue-400 hover:text-blue-600 font-semibold"
                            >
                                Cadastre-se
                            </button>
                        </>
                    ) : (
                        <>
                            Já tem uma conta?{' '}
                            <button
                                onClick={trocarForm}
                                className="text-blue-400 hover:text-blue-600 font-semibold"
                            >
                                Faça login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
