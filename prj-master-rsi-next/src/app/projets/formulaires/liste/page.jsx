'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ListePage() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const response = await fetch('/api/formulaire');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Impossible de charger la liste.');
        }

        if (!ignore) {
          setContent(data.content || []);
          setError('');
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (!user) return <p>Veuillez vous connecter</p>;

  return (
    <div>
      <h1>liste user</h1>

      {error && <p>Erreur : {error}</p>}

      {!error && (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px' }}>CNE</th>
              <th style={{ padding: '10px' }}>Nom</th>
              <th style={{ padding: '10px' }}>Prenom</th>
              <th style={{ padding: '10px' }}>M1</th>
              <th style={{ padding: '10px' }}>M2</th>
              <th style={{ padding: '10px' }}>M3</th>
            </tr>
          </thead>
          <tbody>
            {content.length > 0 ? (
              content.map((etudiant, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px' }}>{etudiant.CNE}</td>
                  <td style={{ padding: '10px' }}>{etudiant.Nom}</td>
                  <td style={{ padding: '10px' }}>{etudiant.Prenom}</td>
                  <td style={{ padding: '10px' }}>{etudiant.M1}</td>
                  <td style={{ padding: '10px' }}>{etudiant.M2}</td>
                  <td style={{ padding: '10px' }}>{etudiant.M3}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                  Aucun utilisateur enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
