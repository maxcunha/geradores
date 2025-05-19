// src/components/CadastroUsuario.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('admin');

  const cadastrar = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);

      // Opcional: salvar nome e tipo no localStorage para exibir após login
      const usuario = {
        uid: cred.user.uid,
        email,
        nome,
        tipo
      };
      alert('Usuário cadastrado com sucesso!');
      console.log('Novo usuário:', usuario);
    } catch (err) {
      alert('Erro ao cadastrar usuário: ' + err.message);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nome"
        className="border px-4 py-2 rounded w-full"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail"
        className="border px-4 py-2 rounded w-full"
      />
      <input
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        placeholder="Senha"
        className="border px-4 py-2 rounded w-full"
      />
      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      >
        <option value="admin">Administrador</option>
        <option value="usuario">Usuário</option>
      </select>
      <button onClick={cadastrar} className="bg-green-600 text-white px-4 py-2 rounded">
        Cadastrar Usuário
      </button>
    </div>
  );
}

export default CadastroUsuario;
