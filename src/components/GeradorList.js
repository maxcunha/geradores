import React, { useEffect, useState } from 'react';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';
import Papa from 'papaparse';

function GeradorList() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem('geradores')) || [];
    setEquipamentos(salvos);
  }, []);

  const salvarEquipamentos = (lista) => {
    localStorage.setItem('geradores', JSON.stringify(lista));
    setEquipamentos(lista);
  };

  const excluir = (index) => {
    if (!window.confirm('Deseja excluir este equipamento?')) return;
    const novaLista = [...equipamentos];
    novaLista.splice(index, 1);
    salvarEquipamentos(novaLista);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = 30;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    doc.addImage(logo, 'PNG', 15, 10, imgWidth, imgHeight);

    doc.setFontSize(12);
    doc.text('Estado de Minas Gerais', 55, 15);
    doc.text('Secretaria do estado de Saúde de Minas Gerais', 55, 22);
    doc.text('Departamento de Infraestrutura e Engenharia', 55, 29);

    const dadosParaPDF = equipamentosFiltrados.map((e, index) => [
      index + 1,
      e.tipo || '',
      e.patrimonio || '',
      e.modelo || '',
      e.fabricante || '',
      e.capacidade_kva || '',
      e.motor || '',
      e.alternador || '',
      e.unidade || '',
      e.endereco || '',
      e.lote || '',
    ]);

    autoTable(doc, {
      startY: 40,
      head: [[
        'Nº', 'Tipo', 'Patrimônio', 'Modelo', 'Fabricante', 
        'Capacidade (kVA)', 'Motor', 'Alternador', 'Unidade', 'Endereço', 'Lote'
      ]],
      body: dadosParaPDF,
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 10 }
      }
    });

    const pageHeight = doc.internal.pageSize.height;
    const dataHora = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Lista de Equipamentos (Total: ${equipamentosFiltrados.length})`, 
      doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });
    doc.setFontSize(8);
    doc.text(dataHora, doc.internal.pageSize.width / 2, pageHeight - 14, { align: 'center' });

    doc.save('equipamentos.pdf');
  };

  const importarCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const novos = results.data.map((row) => ({
          tipo: row.tipo || 'Gerador',
          patrimonio: row.patrimonio || '',
          modelo: row.modelo || '',
          fabricante: row.fabricante || '',
          capacidade_kva: row.capacidade_kva || '',
          motor: row.motor || '',
          alternador: row.alternador || '',
          unidade: row.unidade || '',
          endereco: row.endereco || '',
          lote: row.lote || '',
        }));
        const atual = JSON.parse(localStorage.getItem('geradores')) || [];
        const todos = [...atual, ...novos];
        salvarEquipamentos(todos);
        alert('Equipamentos importados com sucesso!');
      },
    });
  };

  const equipamentosFiltrados = equipamentos.filter(e =>
    e.tipo?.toLowerCase().includes(filtro.toLowerCase()) ||
    e.patrimonio?.toLowerCase().includes(filtro.toLowerCase()) ||
    e.unidade?.toLowerCase().includes(filtro.toLowerCase()) ||
    e.lote?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Pesquisar por tipo, patrimônio, unidade ou lote"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:max-w-md"
        />
        <div className="flex gap-2">
          <input type="file" accept=".csv" onChange={importarCSV} className="bg-white border px-2 py-1 rounded text-sm" />
          <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Exportar PDF</button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Patrimônio</th>
            <th className="border p-2">Modelo</th>
            <th className="border p-2">Fabricante</th>
            <th className="border p-2">Capacidade</th>
            <th className="border p-2">Unidade</th>
            <th className="border p-2">Lote</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentosFiltrados.map((e, i) => (
            <tr key={i} className="text-center">
              <td className="border p-1">{e.tipo}</td>
              <td className="border p-1">{e.patrimonio}</td>
              <td className="border p-1">{e.modelo}</td>
              <td className="border p-1">{e.fabricante}</td>
              <td className="border p-1">{e.capacidade_kva}</td>
              <td className="border p-1">{e.unidade}</td>
              <td className="border p-1">{e.lote}</td>
              <td className="border p-1 space-x-2">
                <button onClick={() => excluir(i)} className="text-red-600">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GeradorList;
