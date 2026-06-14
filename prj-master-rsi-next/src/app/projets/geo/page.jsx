'use client'
import React, { useEffect, useState } from 'react'
// Importation des composants Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export default function GeoPage() {
    const [profil, setProfil] = useState([]);

    useEffect(() => {
        async function geo() {
            try {
                const res = await fetch('/api/geo');
                const data = await res.json();
                setProfil(data);
            } catch (error) {
                console.error("Erreur de récupération :", error);
            }
        }
        geo();
    }, []);

    // Coordonnées du centre (Maroc)
    const positionMaroc = [31.7917, -7.0926];

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: 'red', fontWeight: 'bold' }}>6. Géo localisation</h2>
            <p>Affichage de la carte contenant les positions de géo localisation des étudiants.</p>
            
            {/* On vérifie qu'on est bien côté client avant d'afficher la carte */}
            <div style={{ height: '500px', width: '100%', border: '1px solid #ccc' }}>
                <MapContainer 
                    center={positionMaroc} 
                    zoom={6} 
                    style={{ height: '100%', width: '100%' }}
                >
                    {/* Les "Tuiles" sont les images de fond de la carte (OpenStreetMap est gratuit) */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Boucle sur les étudiants pour poser les marqueurs */}
                    {profil.map((p, index) => (
                        <Marker
                            key={index} 
                            position={[parseFloat(p.latitude), parseFloat(p.longitude)]}
                            icon={icon}
                        >
                            <Popup>
                                <strong>{p.nom}</strong>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}