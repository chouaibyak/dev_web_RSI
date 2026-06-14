@extends('layouts.app')

@section('content')
<h2>Statistiques des notes</h2>
<div style="width: 80%; margin: 0 auto;">
    <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('myChart').getContext('2d');
    const etudiants = @json($etudiants);
    
    const labels = etudiants.map(e => e.nom);
    const moyennes = etudiants.map(e => e.moyenne || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Moyenne des notes',
                data: moyennes,
                backgroundColor: 'rgba(161, 185, 213, 0.6)',
                borderColor: 'rgba(161, 185, 213, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20
                }
            }
        }
    });
</script>
@endsection
