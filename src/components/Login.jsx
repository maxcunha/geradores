import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (encontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(encontrado));
      if (onLogin) onLogin(encontrado);
      window.location.href = '/?aba=dashboard';
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
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
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
