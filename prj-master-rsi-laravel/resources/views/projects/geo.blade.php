@extends('layouts.app')

@section('content')
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

<style>
    .geo-header {
        margin-bottom: 20px;
        border-bottom: 2px solid #A1B9D5;
        padding-bottom: 10px;
    }
    .geo-header h2 {
        margin: 0;
        color: #333;
    }
    .geo-header p {
        margin: 5px 0 0 0;
        color: #666;
        font-size: 0.9em;
    }
    #map-container {
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        background: #fff;
    }
    #map { 
        height: 550px; 
        width: 100%; 
    }
    /* Correction pour éviter les conflits de styles avec le layout */
    .leaflet-container {
        z-index: 1;
    }
</style>

<div class="geo-header">
    <h2>Géolocalisation des étudiants</h2>
    <p>Visualisation des positions géographiques des étudiants du Master RSI.</p>
</div>

<div id="map-container">
    <div id="map"></div>
</div>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const etudiants = @json($etudiants);
        
        // Initialisation de la carte (Centre par défaut sur le Maroc)
        const map = L.map('map').setView([31.7917, -7.0926], 6);

        // Ajout des tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markers = [];

        etudiants.forEach(e => {
            if (e.latitude && e.longitude) {
                const lat = parseFloat(e.latitude);
                const lng = parseFloat(e.longitude);
                
                // Création du marqueur
                const marker = L.marker([lat, lng]).addTo(map);
                
                // Contenu du popup personnalisé
                const popupContent = `
                    <div style="font-family: Arial, sans-serif;">
                        <h4 style="margin: 0 0 5px 0; color: #A1B9D5;">${e.nom}</h4>
                        <p style="margin: 0;"><strong>Login:</strong> ${e.login}</p>
                        <p style="margin: 0;"><strong>Moyenne:</strong> ${e.moyenne ? parseFloat(e.moyenne).toFixed(2) : 'N/A'}</p>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                markers.push([lat, lng]);
            }
        });

        // Ajustement automatique du zoom pour voir tous les marqueurs au centre
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers);
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        // Forcer le rafraîchissement de la taille pour éviter les bugs d'affichage
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    });
</script>
@endsection
