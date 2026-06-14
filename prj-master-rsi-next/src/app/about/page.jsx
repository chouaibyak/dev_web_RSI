'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AboutPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let ignore = false;

    async function loadProfile() {
      try {
        const res = await fetch(`/api/user?id=${user.id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Impossible de charger le profil.');
        }

        if (!ignore) {
          setProfile(data);
          setError('');
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setProfile(null);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (!user) return <p>Veuillez vous connecter pour voir votre profil.</p>;
  if (!user.id) return <p>Erreur : utilisateur invalide.</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!profile) return <p>Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-600 pb-2">
        Mon Curriculum Vitae
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Image
            src="/photo.jpeg"
            alt="Ma Photo"
            width={48}
            height={48}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Informations Personnelles</h2>
            <p><strong>Nom :</strong> {profile.nom}</p>
            <p><strong>Login :</strong> {profile.login}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Notes & Statistiques</h2>
            <p><strong>Note 1 :</strong> {profile.note1} / 20</p>
            <p><strong>Note 2 :</strong> {profile.note2} / 20</p>
            <p className="text-xl font-bold text-blue-600">
              Moyenne : {profile.moyenne}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Localisation</h2>
            <p>Longitude : {profile.longitude}</p>
            <p>Latitude : {profile.latitude}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold border-b border-gray-300 mb-2">Competences</h2>
        <p>JavaScript, React, Next.js, MySQL, PHP...</p>
      </div>
    </div>
  );
}
