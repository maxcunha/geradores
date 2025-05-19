import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';
import ListarUsuarios from './components/ListarUsuarios';
import GeradorForm from './components/GeradorForm';
import GeradorList from './components/GeradorList';
import OrdemServicoForm from './components/OrdemServicoForm';
import OrdemServicoList from './components/OrdemServicoList';
import ContratadaForm from './components/ContratadaForm';
import GestaoContratoForm from './components/GestaoContratoForm';
import ListarContratadas from './components/ListarContratadas';
import ListarGestaoContrato from './components/ListarGestaoContrato';
import Dashboard from './components/Dashboard';

// ✅ Criação automática do admin se nenhum usuário existir
function inicializarAdmin() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.length === 0) {
    const admin = {
      nome: 'admin',
      email: 'admin@ses.mg.gov.br',
      senha: '123456',
      tipo: 'admin'
    };
    localStorage.setItem('usuarios', JSON.stringify([admin]));
    console.log('Admin criado automaticamente');
  }
}

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(
    JSON.parse(localStorage.getItem('usuarioLogado'))
  );

  const [aba, setAba] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('aba') || 'dashboard';
  });

  useEffect(() => {
    inicializarAdmin(); // ✅ Executa a criação do admin
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('aba', aba);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    const titulo = {
      cadastro: 'Cadastrar Equipamento',
      contratada: 'Contratada',
      gestao: 'Gestão do Contrato',
      listar: 'Listar Equipamentos',
      emitir: 'Emitir OS',
      os: 'Listar OS',
      listarContratadas: 'Listar Contratadas',
      listarGestaoContrato: 'Listar Gestão Contrato',
      usuarios: 'Cadastrar Usuário',
      listarUsuarios: 'Listar Usuários',
      dashboard: 'Dashboard'
    };
    document.title = `Manutenção - ${titulo[aba] || 'Sistema'}`;
  }, [aba]);

  if (!usuarioLogado) {
    return <Login onLogin={setUsuarioLogado} />;
  }

  const abas = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cadastro', label: 'Cadastrar Equipamento' },
    { id: 'contratada', label: 'Contratada' },
    { id: 'gestao', label: 'Gestão do Contrato' },
    { id: 'listar', label: 'Listar Equipamentos' },
    { id: 'emitir', label: 'Emitir OS' },
    { id: 'os', label: 'Listar OS' },
    { id: 'listarContratadas', label: 'Listar Contratadas' },
    { id: 'listarGestaoContrato', label: 'Listar Gestão Contrato' },
  ];

  if (usuarioLogado?.tipo === 'admin') {
    abas.push({ id: 'usuarios', label: 'Cadastrar Usuário' });
    abas.push({ id: 'listarUsuarios', label: 'Listar Usuários' });
  }

  const logout = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.reload();
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-start">
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold">Secretaria do Estado de Saúde de Minas Gerais</h1>
          <h2 className="text-2xl font-semibold mt-1">Controle de Manutenção de Equipamentos</h2>
        </div>
        <div className="ml-4 text-right">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
          >
            Sair
          </button>
          <p className="text-sm text-gray-600 mt-1">Bem-vindo, <strong>{usuarioLogado?.nome}</strong></p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {abas.map((abaItem) => (
          <button
            key={abaItem.id}
            onClick={() => setAba(abaItem.id)}
            className={`px-4 py-2 rounded font-semibold transition ${
              aba === abaItem.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
            }`}
          >
            {abaItem.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow max-w-5xl mx-auto">
        {aba === 'cadastro' && <GeradorForm />}
        {aba === 'contratada' && <ContratadaForm />}
        {aba === 'gestao' && <GestaoContratoForm />}
        {aba === 'listar' && <GeradorList />}
        {aba === 'emitir' && <OrdemServicoForm />}
        {aba === 'os' && <OrdemServicoList />}
        {aba === 'listarContratadas' && <ListarContratadas />}
        {aba === 'listarGestaoContrato' && <ListarGestaoContrato />}
        {aba === 'usuarios' && <CadastroUsuario />}
        {aba === 'listarUsuarios' && <ListarUsuarios />}
        {aba === 'dashboard' && <Dashboard />}
      </div>
    </div>
  );
}

export default App;
