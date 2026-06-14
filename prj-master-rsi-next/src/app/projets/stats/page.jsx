'use client'
import { useEffect, useState } from 'react'
// Importation des composants Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatePage() {
    const [profil, setProfil] = useState([]);

    useEffect(() => {
        async function MoyenneNom() {
            try {
                const res = await fetch(`/api/graphics`);
                const data = await res.json();
                setProfil(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données", error);
            }
        }
        MoyenneNom();
    }, []);

    // Configuration des données pour le graphique
    const chartData = {
        labels: profil.map(p => p.nom), // Noms des étudiants en bas (X)
        datasets: [
            {
                label: 'Moyenne des étudiants du Master RSI',
                data: profil.map(p => p.moyenne), // Valeurs des moyennes (Y)
                // Couleurs correspondant à votre image
                backgroundColor: [
                    '#4194ce', 
                    '#8d63a5',
                    '#3fb699',
                    '#ebc4b7',
                    '#c55c54',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options pour le style du graphique
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // On cache la légende pour ressembler à l'image
            },
            title: {
                display: true,
                text: 'Moyenne des étudiants du Master RSI',
                font: { size: 16 }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 16, // On fixe le maximum à 16 comme sur l'image
            }
        }
    };

    return (
        <div style={{ width: '80%', margin: '50px auto' }}>
            <h1 style={{ color: '#800000', textAlign: 'center' }}>Statistiques avec chartJS</h1>
            
            {profil.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    )
}