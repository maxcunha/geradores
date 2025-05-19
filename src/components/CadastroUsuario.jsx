import React, { useState, useEffect } from 'react';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('usuario');

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  useEffect(() => {
    // Apenas para fins de validação futura, ou side-effects
  }, []);

  if (!usuarioLogado || usuarioLogado.tipo !== 'admin') {
    return <p className="text-red-600">Acesso restrito a administradores.</p>;
  }

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }

    const novoUsuario = { nome, email, senha, tipo };
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado com sucesso!');
    setNome('');
    setEmail('');
    setSenha('');
    setTipo('usuario');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cadastro de Usuário</h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="usuario">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
        <button
          onClick={handleCadastro}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CadastroUsuario;
