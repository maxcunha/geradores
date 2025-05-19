import React, { useState } from 'react';
import { Save } from 'lucide-react';

function GeradorForm() {
  const [tipo, setTipo] = useState('Gerador');

  const [equipamento, setEquipamento] = useState({
    patrimonio: '',
    modelo: '',
    fabricante: '',
    capacidade_kva: '',
    motor: '',
    alternador: '',
    unidade: '',
    endereco: '',
    lote: '',
  });

  const handleChange = (e) => {
    setEquipamento({ ...equipamento, [e.target.name]: e.target.value });
  };

  const salvar = () => {
    const lista = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const dados = { ...equipamento, tipo };
    lista.push(dados);
    localStorage.setItem('equipamentos', JSON.stringify(lista));
    alert('Equipamento salvo com sucesso!');
    setEquipamento({
      patrimonio: '',
      modelo: '',
      fabricante: '',
      capacidade_kva: '',
      motor: '',
      alternador: '',
      unidade: '',
      endereco: '',
      lote: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="tipo" value="Gerador" checked={tipo === 'Gerador'} onChange={() => setTipo('Gerador')} />
          Gerador
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="tipo" value="Câmara Fria" checked={tipo === 'Câmara Fria'} onChange={() => setTipo('Câmara Fria')} />
          Câmara Fria
        </label>
      </div>

      <input name="patrimonio" placeholder="Patrimônio" value={equipamento.patrimonio} onChange={handleChange}
        className="border px-4 py-2 rounded w-full" />

      {tipo === 'Gerador' && (
        <>
          <input name="fabricante" placeholder="Fabricante" value={equipamento.fabricante} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
            <input name="modelo" placeholder="Modelo" value={equipamento.modelo} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
          <input name="capacidade_kva" placeholder="Capacidade (kVA)" value={equipamento.capacidade_kva} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
          <input name="motor" placeholder="Motor" value={equipamento.motor} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
          <input name="alternador" placeholder="Alternador" value={equipamento.alternador} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
        </>
      )}

      {tipo === 'Câmara Fria' && (
        <>
          <input name="fabricante" placeholder="Fabricante" value={equipamento.fabricante} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
            <input name="modelo" placeholder="Modelo" value={equipamento.modelo} onChange={handleChange}
            className="border px-4 py-2 rounded w-full" />
        </>
      )}

      <input name="unidade" placeholder="Unidade" value={equipamento.unidade} onChange={handleChange}
        className="border px-4 py-2 rounded w-full" />
      <input name="endereco" placeholder="Endereço" value={equipamento.endereco} onChange={handleChange}
        className="border px-4 py-2 rounded w-full" />
      <input name="lote" placeholder="Lote" value={equipamento.lote} onChange={handleChange}
        className="border px-4 py-2 rounded w-full" />

    

      <button onClick={salvar} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded">
        <Save size={18} /> Salvar
      </button>
    </div>
  );
}

export default GeradorForm;
