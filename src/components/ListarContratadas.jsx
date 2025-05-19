import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png';

function ListarContratadas() {
  const [contratadas, setContratadas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [editando, setEditando] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem('contratadas')) || [];
    setContratadas(lista);
  }, []);

  const salvarEdicao = (index) => {
    const novas = [...contratadas];
    novas[index] = editData;
    localStorage.setItem('contratadas', JSON.stringify(novas));
    setContratadas(novas);
    setEditando(null);
  };

  const excluir = (index) => {
    if (window.confirm('Tem certeza que deseja excluir esta contratada?')) {
      const novas = [...contratadas];
      novas.splice(index, 1);
      localStorage.setItem('contratadas', JSON.stringify(novas));
      setContratadas(novas);
    }
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

    const dados = contratadas.filter(c =>
      c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      c.lote.toLowerCase().includes(filtro.toLowerCase())
    ).map((c, i) => [
      i + 1,
      c.nome,
      c.cnpj,
      c.telefone,
      c.email,
      c.contrato,
      c.lote
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Nº', 'Nome', 'CNPJ', 'Telefone', 'Email', 'Contrato', 'Lote']],
      body: dados,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      columnStyles: { 0: { cellWidth: 10 } }
    });

    const pageHeight = doc.internal.pageSize.height;
    const dataHora = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Lista de Contratadas (Total: ${dados.length})`, doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });
    doc.setFontSize(8);
    doc.text(dataHora, doc.internal.pageSize.width / 2, pageHeight - 14, { align: 'center' });

    doc.save('contratadas.pdf');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <input
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Pesquisar por nome ou lote"
          className="border px-4 py-2 rounded w-full"
        />
        <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">CNPJ</th>
            <th className="border px-2 py-1">Telefone</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Contrato</th>
            <th className="border px-2 py-1">Lote</th>
            <th className="border px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contratadas.filter(c =>
            c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            c.lote.toLowerCase().includes(filtro.toLowerCase())
          ).map((c, index) => (
            <tr key={index}>
              {editando === index ? (
                <>
                  <td className="border px-2 py-1"><input value={editData.nome} onChange={e => setEditData({ ...editData, nome: e.target.value })} /></td>
                  <td className="border px-2 py-1"><input value={editData.cnpj} onChange={e => setEditData({ ...editData, cnpj: e.target.value })} /></td>
                  <td className="border px-2 py-1"><input value={editData.telefone} onChange={e => setEditData({ ...editData, telefone: e.target.value })} /></td>
                  <td className="border px-2 py-1"><input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></td>
                  <td className="border px-2 py-1"><input value={editData.contrato} onChange={e => setEditData({ ...editData, contrato: e.target.value })} /></td>
                  <td className="border px-2 py-1"><input value={editData.lote} onChange={e => setEditData({ ...editData, lote: e.target.value })} /></td>
                  <td className="border px-2 py-1">
                    <button onClick={() => salvarEdicao(index)} className="text-green-600">💾</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-2 py-1">{c.nome}</td>
                  <td className="border px-2 py-1">{c.cnpj}</td>
                  <td className="border px-2 py-1">{c.telefone}</td>
                  <td className="border px-2 py-1">{c.email}</td>
                  <td className="border px-2 py-1">{c.contrato}</td>
                  <td className="border px-2 py-1">{c.lote}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => { setEditando(index); setEditData(c); }} className="text-blue-600 mr-2">✏️</button>
                    <button onClick={() => excluir(index)} className="text-red-600">🗑️</button>
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

export default ListarContratadas;
