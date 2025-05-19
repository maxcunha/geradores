import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png';

function ListarOS() {
  const [ordens, setOrdens] = useState([]);
  const [filtro, setFiltro] = useState({ lote: '', tipo: '', unidade: '', patrimonio: '', status: '' });

  useEffect(() => {
    const os = JSON.parse(localStorage.getItem('ordensServico')) || [];
    setOrdens(os);
  }, []);

  const darBaixa = (index) => {
    const novaLista = [...ordens];
    novaLista[index].status = 'baixada';
    novaLista[index].dataBaixa = new Date().toLocaleDateString();
    localStorage.setItem('ordensServico', JSON.stringify(novaLista));
    setOrdens(novaLista);
  };

  const ordensFiltradas = ordens.filter(os => {
    return (
      (!filtro.lote || os.lote?.toLowerCase().includes(filtro.lote.toLowerCase())) &&
      (!filtro.tipo || os.tipo?.toLowerCase() === filtro.tipo.toLowerCase()) &&
      (!filtro.unidade || os.unidade?.toLowerCase().includes(filtro.unidade.toLowerCase())) &&
      (!filtro.patrimonio || os.patrimonio?.toLowerCase().includes(filtro.patrimonio.toLowerCase())) &&
      (!filtro.status || os.status?.toLowerCase() === filtro.status.toLowerCase())
    );
  });

  const exportarPDF = () => {
    const doc = new jsPDF();
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = 30;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    doc.addImage(logo, 'PNG', 15, 10, imgWidth, imgHeight);
    doc.setFontSize(12);
    doc.text('Estado de Minas Gerais', 55, 15);
    doc.text('Secretaria do Estado de Saúde de Minas Gerais', 55, 22);
    doc.text('Departamento de Infraestrutura e Engenharia', 55, 29);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Unidade', 'Tipo', 'Patrimônio', 'Fabricante', 'Capacidade', 'Lote', 'Descrição', 'Status', 'Data']],
      body: ordensFiltradas.map((os, i) => [
        i + 1,
        os.unidade || '-',
        os.tipo || '-',
        os.patrimonio || '-',
        os.fabricante || '-',
        os.capacidade || '-',
        os.lote || '-',
        os.descricao || '-',
        os.status || 'pendente',
        os.data || '-'
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });

    const pageHeight = doc.internal.pageSize.height;
    const dataHora = new Date().toLocaleString();

    doc.setFontSize(10);
    doc.text(`Ordens de Serviço (Filtradas: ${ordensFiltradas.length})`, doc.internal.pageSize.width / 2, pageHeight - 20, { align: 'center' });
    doc.setFontSize(8);
    doc.text(dataHora, doc.internal.pageSize.width / 2, pageHeight - 14, { align: 'center' });

    doc.text('Assinatura do Fiscal: ______________________________________', 20, pageHeight - 60);
    doc.text('Assinatura da Contratada: _________________________________', 20, pageHeight - 50);

    doc.save('ordens-servico.pdf');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <input placeholder="Pesquisar por lote" value={filtro.lote} onChange={e => setFiltro({ ...filtro, lote: e.target.value })} className="border px-2 py-1 rounded" />
        <input placeholder="Tipo de equipamento" value={filtro.tipo} onChange={e => setFiltro({ ...filtro, tipo: e.target.value })} className="border px-2 py-1 rounded" />
        <input placeholder="Tipo de unidade" value={filtro.unidade} onChange={e => setFiltro({ ...filtro, unidade: e.target.value })} className="border px-2 py-1 rounded" />
        <input placeholder="Patrimônio" value={filtro.patrimonio} onChange={e => setFiltro({ ...filtro, patrimonio: e.target.value })} className="border px-2 py-1 rounded" />
        <select value={filtro.status} onChange={e => setFiltro({ ...filtro, status: e.target.value })} className="border px-2 py-1 rounded">
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="baixada">Baixada</option>
        </select>
      </div>

      <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>

      <table className="w-full border text-sm mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-1">Unidade</th>
            <th className="border p-1">Tipo</th>
            <th className="border p-1">Patrimônio</th>
            <th className="border p-1">Descrição</th>
            <th className="border p-1">Status</th>
            <th className="border p-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordensFiltradas.map((os, i) => (
            <tr key={i} className="text-center">
              <td className="border p-1">{os.unidade}</td>
              <td className="border p-1">{os.tipo}</td>
              <td className="border p-1">{os.patrimonio}</td>
              <td className="border p-1">{os.descricao}</td>
              <td className="border p-1">{os.status || 'pendente'}</td>
              <td className="border p-1">
                {os.status !== 'baixada' && (
                  <button onClick={() => darBaixa(i)} className="bg-green-600 text-white px-2 py-1 rounded">Dar baixa</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarOS;
