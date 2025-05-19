// src/components/OrdemServicoForm.jsx
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png';

function OrdemServicoForm() {
  const [os, setOs] = useState({ patrimonio: '', descricao: '', data: '' });
  const [equipamentos, setEquipamentos] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [gestoes, setGestoes] = useState([]);
  const [contratadas, setContratadas] = useState([]);

  useEffect(() => {
    setEquipamentos(JSON.parse(localStorage.getItem('geradores')) || []);
    setOrdens(JSON.parse(localStorage.getItem('ordensServico')) || []);
    setGestoes(JSON.parse(localStorage.getItem('gestaoContrato')) || []);
    setContratadas(JSON.parse(localStorage.getItem('contratadas')) || []);
  }, []);

  const salvar = () => {
    const novaLista = [...ordens, os];
    localStorage.setItem('ordensServico', JSON.stringify(novaLista));
    setOrdens(novaLista);
    setOs({ patrimonio: '', descricao: '', data: '' });
    alert('OS salva com sucesso!');
  };

  const excluir = () => {
    const novaLista = [...ordens];
    novaLista.pop();
    localStorage.setItem('ordensServico', JSON.stringify(novaLista));
    setOrdens(novaLista);
  };

  const ultimaOS = ordens.length > 0 ? ordens[ordens.length - 1] : null;
  const equipamento = equipamentos.find(e => e.patrimonio === ultimaOS?.patrimonio);
  const gestao = gestoes.find(g => g.lote === equipamento?.lote);
  const contratada = contratadas.find(c => c.lote === equipamento?.lote);

  const exportarPDF = () => {
    const doc = new jsPDF();

    // Cabeçalho
    const imgProps = doc.getImageProperties(logo);
    const imgWidth = 30;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    doc.addImage(logo, 'PNG', 15, 10, imgWidth, imgHeight);
    doc.setFontSize(12);
    doc.text('Estado de Minas Gerais', 55, 15);
    doc.text('Secretaria do Estado de Saúde de Minas Gerais', 55, 22);
    doc.text('Departamento de Infraestrutura e Engenharia', 55, 29);

    doc.setFontSize(10);
    doc.text(`Data da OS: ${ultimaOS?.data}`, 15, 45);

    autoTable(doc, {
      startY: 50,
      head: [['Campo', 'Informação']],
      body: [
        ['Descrição do problema', ultimaOS?.descricao || ''],
        ['Equipamento', equipamento ? `${equipamento.tipo} - ${equipamento.patrimonio}` : ''],
        ['Fabricante', equipamento?.fabricante || ''],
        ['Capacidade', equipamento?.capacidade || ''],
        ['Unidade', equipamento?.unidade || ''],
        ['Lote', equipamento?.lote || ''],
        ['Gestor', gestao?.gestor || ''],
        ['Fiscal', gestao?.fiscal || ''],
        ['Contratada', contratada?.nome || ''],
        ['CNPJ Contratada', contratada?.cnpj || ''],
      ],
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.text('Assinatura do Fiscal: ________________________________', 15, doc.autoTable.previous.finalY + 20);
    doc.text('Assinatura da Contratada: _____________________________', 15, doc.autoTable.previous.finalY + 35);

    doc.save('ordem-de-servico.pdf');
  };

  return (
    <div className="space-y-4">
      <select
        value={os.patrimonio}
        onChange={e => setOs({ ...os, patrimonio: e.target.value })}
        className="border px-4 py-2 rounded w-full"
      >
        <option value="">Selecione o equipamento</option>
        {equipamentos.map((e, i) => (
          <option key={i} value={e.patrimonio}>
            {e.tipo} | Patrimônio: {e.patrimonio} | Fab: {e.fabricante} | Capacidade: {e.capacidade}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={os.data}
        onChange={e => setOs({ ...os, data: e.target.value })}
        className="border px-4 py-2 rounded w-full"
      />
      <input
        value={os.descricao}
        onChange={e => setOs({ ...os, descricao: e.target.value })}
        placeholder="Descrição do problema"
        className="border px-4 py-2 rounded w-full"
      />
      <div className="flex space-x-2">
        <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar OS</button>
        <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button onClick={excluir} className="bg-red-600 text-white px-4 py-2 rounded">Excluir Última OS</button>
      </div>

      {ultimaOS && equipamento && (
        <div className="border p-4 rounded bg-gray-50 text-sm">
          <h3 className="font-semibold mb-2">Última OS Emitida</h3>
          <p><strong>Data:</strong> {ultimaOS.data}</p>
          <p><strong>Descrição:</strong> {ultimaOS.descricao}</p>
          <p><strong>Equipamento:</strong> {equipamento.tipo} | Patrimônio: {equipamento.patrimonio}</p>
          <p><strong>Fabricante:</strong> {equipamento.fabricante}</p>
          <p><strong>Capacidade:</strong> {equipamento.capacidade}</p>
          <p><strong>Unidade:</strong> {equipamento.unidade}</p>
          <p><strong>Lote:</strong> {equipamento.lote}</p>
          <p><strong>Gestor:</strong> {gestao?.gestor} | <strong>Fiscal:</strong> {gestao?.fiscal}</p>
          <p><strong>Contratada:</strong> {contratada?.nome}</p>
        </div>
      )}
    </div>
  );
}

export default OrdemServicoForm;
