import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { LogOut } from 'lucide-react';  // Importa o ícone

interface Usuario {
    id: number;
    nome: string;
    apelido?: string | null;
    email: string;
    dataNascimento: string;
    tipoUsuario: string;
}

export default function Usuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            setUsuario(JSON.parse(storedUsuario));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        alert('Logout realizado com sucesso!');
        navigate('/login');
    };

    const formatarData = (data: string) => {
        const dataObj = new Date(data);
        return new Intl.DateTimeFormat('pt-BR').format(dataObj);
    };

    if (!usuario) return null;

    return (
        <div className="bg-gray-800 min-h-screen w-full flex flex-col">
            <NavBar />

            <div className="flex flex-col items-center justify-center flex-grow px-4">
                <div className="p-8 rounded-lg text-white font-sans w-full max-w-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-center">Perfil do Usuário</h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="font-semibold">Nome:</span> {usuario.nome}
                        </div>
                        {usuario.apelido && (
                            <div>
                                <span className="font-semibold">Apelido:</span> {usuario.apelido}
                            </div>
                        )}
                        <div>
                            <span className="font-semibold">Email:</span> {usuario.email}
                        </div>
                        <div>
                            <span className="font-semibold">Data de Nascimento:</span> {formatarData(usuario.dataNascimento)}
                        </div>
                    </div>

                    <div 
                        onClick={logout} 
                        className="mt-6 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 cursor-pointer transition"
                    >
                        <LogOut size={20} />
                        <span className="font-semibold">Sair</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
