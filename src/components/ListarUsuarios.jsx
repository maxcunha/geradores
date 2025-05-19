import React, { useEffect, useState } from 'react';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(lista);
  }, []);

  const excluir = (index) => {
    if (!window.confirm('Deseja realmente excluir este usuário?')) return;
    const novaLista = [...usuarios];
    novaLista.splice(index, 1);
    setUsuarios(novaLista);
    localStorage.setItem('usuarios', JSON.stringify(novaLista));
  };

  const editar = (index) => {
    const usuario = usuarios[index];
    const nome = prompt('Novo nome:', usuario.nome);
    const email = prompt('Novo e-mail:', usuario.email);
    const senha = prompt('Nova senha:', usuario.senha);
    const tipo = prompt('Novo tipo (admin/usuario):', usuario.tipo);

    if (nome && email && senha && tipo) {
      const novaLista = [...usuarios];
      novaLista[index] = { nome, email, senha, tipo };
      setUsuarios(novaLista);
      localStorage.setItem('usuarios', JSON.stringify(novaLista));
    }
  };

  // ✅ somente agora, após os hooks, verifique permissões
  if (!usuarioLogado || usuarioLogado.tipo !== 'admin') {
    return <p className="text-red-600">Acesso restrito a administradores.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">E-mail</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{u.nome}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.tipo}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => editar(i)} className="bg-yellow-500 px-2 py-1 rounded text-white">Editar</button>
                <button onClick={() => excluir(i)} className="bg-red-600 px-2 py-1 rounded text-white">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarUsuarios;
