'use client'

import { useAuth } from "@/context/AuthContext"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RemplirFormulaire(){
    const [nomValeur, setNomValeur] = useState('');
    const [prenomValeur, setPrenomValeur] = useState('');
    const [cneValeur, setCneValeur] = useState('');

    const [module1, setModule1] = useState('');
    const [module2, setModule2] = useState('');
    const [module3, setModule3] = useState('');

    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('/api/formulaire', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    nom: nomValeur, 
                    prenom: prenomValeur, 
                    cne: cneValeur,
                    m1: module1,
                    m2: module2,
                    m3: module3,
                }) 
            });

            const data = await response.json();

            if(!response.ok){
                alert('Erreur');
                return
            }

            alert('Data bien enregistrer dans fil !');
            router.push('/projets/formulaires/liste')

        }catch(error){
            alert('Erreur serveur : ' + error.message);
        }
    }

    return(
        <div style={{backgroundColor: '#191970', padding: '10px'}}>
            <h1 style={{color: 'white'}}>Gestion de formulaire avec les fichiers</h1>

            <div style={{backgroundColor: '#4682B4', padding: '15px', borderRadius: '10px'}}>

                <form onSubmit={handleFormSubmit}>

                    <h2 style={{color: 'white'}}>1. Informations</h2>

                    <table style={{ borderSpacing: '0 10px' }}>
                        <tbody>
                                <tr style={{ backgroundColor: '#48D1CC'}}>
                                    <td style={{ padding: '10px'  }}>
                                        <label htmlFor="nom">Nom :</label>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input 
                                        id="nom" 
                                        type="text"
                                        onChange={(e) => setNomValeur(e.target.value)}
                                        />
                                    </td>
                                </tr>

                                <tr style={{ backgroundColor: '#48D1CC' }}>
                                    <td style={{ padding: '10px' }}>
                                        <label htmlFor="prenom">Prénom :</label>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input 
                                        id="prenom" 
                                        type="text" 
                                        onChange={(e) => setPrenomValeur(e.target.value)}
                                        />
                                    </td>
                                </tr>

                                <tr style={{ backgroundColor: '#48D1CC' }}>
                                    <td style={{ padding: '10px' }}>
                                        <label htmlFor="cne">CNE :</label>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <input 
                                        id="cne" 
                                        type="text" 
                                        onChange={(e) => setCneValeur(e.target.value)}
                                        />
                                    </td>
                                </tr>
                        </tbody>
                    </table>

                    <h2 style={{color: 'white'}}>2. Notes des modules</h2>

                    <table style={{ borderSpacing: '0 10px' }}>
                        <tbody>

                            <tr style={{ backgroundColor: '#48D1CC' }}>
                                <td style={{ padding: '10px' }}>
                                    <label htmlFor="m1">Module 1 :</label>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <input 
                                    id="m1" 
                                    type="number" 
                                    onChange={(e) => setModule1(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr style={{ backgroundColor: '#48D1CC' }}>
                                <td style={{ padding: '10px' }}>
                                    <label htmlFor="m2">Module 2 :</label>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <input 
                                    id="m2" 
                                    type="number" 
                                    onChange={(e) => setModule2(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr style={{ backgroundColor: '#48D1CC' }}>
                                <td style={{ padding: '10px' }}>
                                    <label htmlFor="m3">Module 3 :</label>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <input 
                                    id="m3" 
                                    type="number" 
                                    onChange={(e) => setModule3(e.target.value)}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <button 
                    style={{ marginTop: '10px', padding: '8px 15px' }}
                    type="submit">
                        Valider
                    </button>
                </form>

                <Link
                    href="/projets/formulaires/liste"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                    Consulter liste
                </Link>
            </div>
        </div>
    )
}

export default function FormulairesPage(){
    const { user } = useAuth();

    if(!user) return <p>Veuillez vous connecter</p>;

    return <RemplirFormulaire />
}
