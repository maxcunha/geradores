import React, { useState } from 'react';
import { Save } from 'lucide-react';

function ContratadaForm() {
  const [contratada, setContratada] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    contrato: '',
    lote: ''
  });

  const salvar = () => {
    const lista = JSON.parse(localStorage.getItem('contratadas')) || [];
    lista.push(contratada);
    localStorage.setItem('contratadas', JSON.stringify(lista));
    alert('Contratada salva!');
    setContratada({ nome: '', cnpj: '', telefone: '', email: '', contrato: '', lote: '' });
  };

  return (
    <div className="space-y-4">
      <input value={contratada.nome} onChange={e => setContratada({ ...contratada, nome: e.target.value })} placeholder="Nome da Contratada" className="border px-4 py-2 rounded w-full" />
      <input value={contratada.cnpj} onChange={e => setContratada({ ...contratada, cnpj: e.target.value })} placeholder="CNPJ" className="border px-4 py-2 rounded w-full" />
      <input value={contratada.telefone} onChange={e => setContratada({ ...contratada, telefone: e.target.value })} placeholder="Telefone" className="border px-4 py-2 rounded w-full" />
      <input value={contratada.email} onChange={e => setContratada({ ...contratada, email: e.target.value })} placeholder="Email" className="border px-4 py-2 rounded w-full" />
      <input value={contratada.contrato} onChange={e => setContratada({ ...contratada, contrato: e.target.value })} placeholder="Número do Contrato" className="border px-4 py-2 rounded w-full" />
      <input value={contratada.lote} onChange={e => setContratada({ ...contratada, lote: e.target.value })} placeholder="Lote" className="border px-4 py-2 rounded w-full" />
      <button onClick={salvar} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded">
        <Save size={18} /> Salvar
      </button>
    </div>
  );
}

export default ContratadaForm;
