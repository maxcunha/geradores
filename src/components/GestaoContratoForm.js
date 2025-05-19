import React, { useState } from 'react';

function GestaoContratoForm() {
  const [gestao, setGestao] = useState({
    lote: '',
    unidade: '',
    fiscal: '',
    telefoneFiscal: '',
    emailFiscal: '',
    gestor: '',
    telefoneGestor: '',
    emailGestor: ''
  });

  const salvar = () => {
    const lista = JSON.parse(localStorage.getItem('gestaoContrato')) || [];
    lista.push(gestao);
    localStorage.setItem('gestaoContrato', JSON.stringify(lista));
    alert('Gestão do contrato salva!');
    setGestao({
      lote: '',
      unidade: '',
      fiscal: '',
      telefoneFiscal: '',
      emailFiscal: '',
      gestor: '',
      telefoneGestor: '',
      emailGestor: ''
    });
  };

  return (
    <div className="space-y-4 p-4">
      <input value={gestao.lote} onChange={e => setGestao({ ...gestao, lote: e.target.value })} placeholder="Lote" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.unidade} onChange={e => setGestao({ ...gestao, unidade: e.target.value })} placeholder="Unidade" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.fiscal} onChange={e => setGestao({ ...gestao, fiscal: e.target.value })} placeholder="Fiscal do contrato" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.telefoneFiscal} onChange={e => setGestao({ ...gestao, telefoneFiscal: e.target.value })} placeholder="Telefone do fiscal" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.emailFiscal} onChange={e => setGestao({ ...gestao, emailFiscal: e.target.value })} placeholder="Email do fiscal" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.gestor} onChange={e => setGestao({ ...gestao, gestor: e.target.value })} placeholder="Gestor do contrato" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.telefoneGestor} onChange={e => setGestao({ ...gestao, telefoneGestor: e.target.value })} placeholder="Telefone do gestor" className="border px-4 py-2 rounded w-full" />
      <input value={gestao.emailGestor} onChange={e => setGestao({ ...gestao, emailGestor: e.target.value })} placeholder="Email do gestor" className="border px-4 py-2 rounded w-full" />
      <button onClick={salvar} className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
    </div>
  );
}

export default GestaoContratoForm;
