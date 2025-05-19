// src/components/ListarGestaoContrato.jsx
import React, { useEffect, useState } from 'react';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';

function ListarGestaoContrato() {
  const [gestoes, setGestoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [editData, setEditData] = useState({});
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem('gestaoContrato')) || [];
    setGestoes(salvos);
  }, []);

  const excluir = (index) => {
    if (window.confirm('Deseja realmente excluir esta gestão de contrato?')) {
      const novaLista = [...gestoes];
      novaLista.splice(index, 1);
      localStorage.setItem('gestaoContrato', JSON.stringify(novaLista));
      setGestoes(novaLista);
    }
  };

  const salvarEdicao = (index) => {
    const novas = [...gestoes];
    novas[index] = editData;
    localStorage.setItem('gestaoContrato', JSON.stringify(novas));
    setGestoes(novas);
    setEditando(null);
  };

  const gestoesFiltradas = gestoes.filter(g =>
    g.gestor?.toLowerCase().includes(filtro.toLowerCase()) ||
    g.fiscal?.toLowerCase().includes(filtro.toLowerCase()) ||
    g.lote?.toLowerCase().includes(filtro.toLowerCase())
  );

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

    autoTable(doc, {
      startY: 40,
      head: [['Nº', 'Gestor', 'Telefone', 'Email', 'Fiscal', 'Telefone', 'Email', 'Lote']],
      body: gestoesFiltradas.map((g, i) => [
        i + 1,
        g.gestor,
        g.telefoneGestor,
        g.emailGestor,
        g.fiscal,
        g.telefoneFiscal,
        g.emailFiscal,
        g.lote
      ]),
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });

    const pageHeight = doc.internal.pageSize.height;
    const dataHora = new Date().toLocaleString();

    doc.setFontSize(10);
    doc.text(`Gestão de Contratos (Total: ${gestoesFiltradas.length})`, doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });
    doc.setFontSize(8);
    doc.text(dataHora, doc.internal.pageSize.width / 2, pageHeight - 14, { align: 'center' });

    doc.save('gestao-contratos.pdf');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Pesquisar por gestor, fiscal ou lote"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
        <button onClick={exportarPDF} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Gestor</th>
            <th className="border p-2">Telefone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Fiscal</th>
            <th className="border p-2">Telefone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Lote</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {gestoesFiltradas.map((g, index) => (
            <tr key={index} className="text-center">
              {editando === index ? (
                <>
                  <td className="border p-1"><input value={editData.gestor} onChange={e => setEditData({ ...editData, gestor: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.telefoneGestor} onChange={e => setEditData({ ...editData, telefoneGestor: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.emailGestor} onChange={e => setEditData({ ...editData, emailGestor: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.fiscal} onChange={e => setEditData({ ...editData, fiscal: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.telefoneFiscal} onChange={e => setEditData({ ...editData, telefoneFiscal: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.emailFiscal} onChange={e => setEditData({ ...editData, emailFiscal: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1"><input value={editData.lote} onChange={e => setEditData({ ...editData, lote: e.target.value })} className="border rounded px-1 w-full" /></td>
                  <td className="border p-1">
                    <button onClick={() => salvarEdicao(index)} className="text-green-600 mr-2">💾</button>
                    <button onClick={() => setEditando(null)} className="text-gray-600">❌</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-1">{g.gestor}</td>
                  <td className="border p-1">{g.telefoneGestor}</td>
                  <td className="border p-1">{g.emailGestor}</td>
                  <td className="border p-1">{g.fiscal}</td>
                  <td className="border p-1">{g.telefoneFiscal}</td>
                  <td className="border p-1">{g.emailFiscal}</td>
                  <td className="border p-1">{g.lote}</td>
                  <td className="border p-1 space-x-2">
                    <button onClick={() => { setEditando(index); setEditData(g); }} className="text-blue-600 mr-2">✏️</button>
                    <button onClick={() => excluir(index)} className="bg-red-600 px-2 py-1 text-white rounded">Excluir</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarGestaoContrato;
