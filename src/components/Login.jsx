import React, { useState, useEffect } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (encontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(encontrado));
      if (onLogin) onLogin(encontrado);
      window.location.href = '/?aba=dashboard';
    } else {
      setErro('Usuário ou senha inválidos');
    }
  };

  // ✅ Criar admin manualmente (botão)
  const criarAdmin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const jaExiste = usuarios.find(u => u.email === 'admin@ses.mg.gov.br');

    if (!jaExiste) {
      usuarios.push({
        nome: 'admin',
        email: 'admin@ses.mg.gov.br',
        senha: '123456',
        tipo: 'admin'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Usuário admin criado com sucesso!');
    } else {
      alert('O usuário admin já existe.');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail"
        className="border px-4 py-2 rounded w-full mb-2"
      />
      <input
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        placeholder="Senha"
        className="border px-4 py-2 rounded w-full mb-4"
      />

      {erro && <p className="text-red-600 text-sm mb-2">{erro}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
      >
        Entrar
      </button>

      <button
        onClick={criarAdmin}
        className="bg-green-600 text-white px-4 py-2 rounded w-full text-sm"
      >
        Criar Usuário Admin
      </button>
    </div>
  );
}

export default Login;
