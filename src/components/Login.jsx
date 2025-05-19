// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      const usuario = {
        uid: cred.user.uid,
        email: cred.user.email,
        nome: cred.user.displayName || 'Usuário',
        tipo: 'usuario'
      };
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      if (onLogin) onLogin(usuario);
      window.location.href = '/?aba=dashboard';
    } catch (erro) {
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
