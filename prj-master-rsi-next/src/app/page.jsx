'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, pass: passInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Erreur : ' + (data.message || 'Identifiants incorrects'));
        return;
      }

      alert('Bienvenue ' + data.user.nom);
      login(data.user);
      router.push('/about');
    } catch (error) {
      alert('Erreur serveur : ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ backgroundColor: '#d1e9ff', padding: '40px', borderRadius: '8px', textAlign: 'center', width: '400px', border: '1px solid #000' }}>
        <h2 style={{ marginBottom: '20px' }}>Page d&apos;authentification</h2>

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Login"
            style={{ padding: '10px', border: '1px solid #ccc' }}
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{ padding: '10px', border: '1px solid #ccc' }}
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
