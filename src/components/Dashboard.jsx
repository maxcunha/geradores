import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const [geradores, setGeradores] = useState([]);
  const [camara, setCamara] = useState([]);
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarDados = () => {
    setLoading(true);
    setTimeout(() => {
      setGeradores(JSON.parse(localStorage.getItem('geradores')) || []);
      setCamara(JSON.parse(localStorage.getItem('camara')) || []);
      setOrdens(JSON.parse(localStorage.getItem('ordensServico')) || []);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const totalEquipamentos = geradores.length + camara.length;
  const totalOS = ordens.length;
  const osBaixadas = ordens.filter(os => os.status === 'baixada').length;
  const osPendentes = ordens.filter(os => os.status !== 'baixada').length;
  const percentualBaixadas = totalOS ? Math.round((osBaixadas / totalOS) * 100) : 0;

  const dataBar = {
    labels: ['Geradores', 'Câmaras Frias', 'OS Emitidas', 'OS Baixadas', 'OS Pendentes'],
    datasets: [
      {
        label: 'Totais',
        data: [geradores.length, camara.length, totalOS, osBaixadas, osPendentes],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgb(239, 68, 68)',
        ],
        borderRadius: 6,
      },
    ],
  };

  const optionsBar = {
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-center">Painel de Indicadores</h2>
        <button
          onClick={carregarDados}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Atualizar Dados
        </button>
      </div>

      {loading ? (
        <div className="text-center text-blue-600 font-medium">Carregando...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 p-4 rounded shadow">
              <p className="text-blue-800 font-semibold">Equipamentos</p>
              <h3 className="text-2xl font-bold">{totalEquipamentos}</h3>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
              <p className="text-yellow-800 font-semibold">OS Emitidas</p>
              <h3 className="text-2xl font-bold">{totalOS}</h3>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
              <p className="text-green-800 font-semibold">OS Baixadas</p>
              <h3 className="text-2xl font-bold">{osBaixadas}</h3>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <p className="text-red-800 font-semibold">OS Pendentes</p>
              <h3 className="text-2xl font-bold">{osPendentes}</h3>
            </div>
            <div className="bg-indigo-100 p-4 rounded shadow col-span-2">
              <p className="text-indigo-800 font-semibold">% de OS Baixadas</p>
              <h3 className="text-2xl font-bold">{percentualBaixadas}%</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Resumo Gráfico</h3>
            <Bar data={dataBar} options={optionsBar} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
