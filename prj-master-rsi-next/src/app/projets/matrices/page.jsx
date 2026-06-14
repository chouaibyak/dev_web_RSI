'use client'

import { useAuth } from "@/context/AuthContext"
import { useState } from "react";

function MatriceBox({ title, onGenerate }) {

    const [nbrLigne, setNbrLigne] = useState('');
    const [nbrColumn, setNbrColumn] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const l = parseInt(nbrLigne);
        const c = parseInt(nbrColumn);

        let matrice = [];

        for (let i = 0; i < l; i++) {
            let row = [];
            for (let j = 0; j < c; j++) {
                row.push(Math.floor(Math.random() * 10));
            }
            matrice.push(row);
        }

        onGenerate(matrice);

        const matriceString = matrice
            .map(r => r.join(' '))
            .join('\n');

        setResult(matriceString);
    };

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <h2 style={{width: '500px', backgroundColor:'blue', color: 'white', textAlign: 'center'}}>{title}</h2>

            <form onSubmit={handleSubmit} >
                <table style={{marginBottom: '20px'}}>
                    <tbody>
                        <tr>
                            <td>
                                <label>Nombre des Lignes : </label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    style={{ width: '200px', borderBlockColor: 'blue'}}
                                    value={nbrLigne}
                                    onChange={(e) => setNbrLigne(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label> Nombre des column : </label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    style={{ width: '200px', borderBlockColor: 'blue'}}
                                    value={nbrColumn}
                                    onChange={(e) => setNbrColumn(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Générer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <textarea 
                value={result} 
                readOnly 
                style={{width: '400px', height: '150px'}}
            />
        </div>
    );
}

function SumMatrice({ m1, m2}){
    const [result, setResult] = useState('');

    const handleSum = () => {
        if (!m1.length || !m2.length) return;

        let res = [];

        // boucle sur les lignes
        for (let i = 0; i < m1.length; i++) {
            let row = [];

            // boucle sur les colonnes
            for (let j = 0; j < m1[i].length; j++) {
                row.push(m1[i][j] + m2[i][j]);
            }

            res.push(row);
        }

        // transformer en texte
        let str = '';

        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[i].length; j++) {
                str += res[i][j] + ' ';
            }
            str += '\n';
        }

        setResult(str);
    };

    return (
            <div id="somme" style={{ display: 'flex', flexDirection: "column", marginTop: '10px'}}>
                <button onClick={handleSum}> Calculer Somme</button>
                <label>Resultat de la Somme: </label>
                <textarea
                style={{width: '250px', height: '100px'}}
                value={result}
                readOnly
                />
            </div>
    )
}

function ProdMatrice({ m1, m2}){
    const [result, setResult] = useState('');

    const handleProd = () => {
        if (!m1.length || !m2.length) return;

        let l1 = m1.length;
        let c1 = m1[0].length;
        let l2 = m2.length;
        let c2 = m2[0].length;

        // condition obligatoire
        if (c1 !== l2) {
            setResult("Matrices incompatibles");
            return;
        }

        let res = [];

        for (let i = 0; i < l1; i++) {
            res[i] = [];

            for (let j = 0; j < c2; j++) {
                let sum = 0;

                for (let k = 0; k < c1; k++) {
                    sum += m1[i][k] * m2[k][j];
                }

                res[i][j] = sum;
            }
        }

        const str = res.map(r => r.join(' ')).join('\n');
        setResult(str);
    }

    return (
        <div id="produit" style={{ display: 'flex', flexDirection: "column", marginTop: '10px'}}>
            <button onClick={handleProd}> Calculer produit</button>
            <label>Resultat de la produit: </label>
            <textarea
                style={{width: '250px', height: '100px'}}
                value={result}
                readOnly
            />
        </div>
    )
}

export default function MatricesPage(){
    const { user } = useAuth();
    const [matrice1, setMatrice1] = useState([]);
    const [matrice2, setMatrice2] = useState([]);

    if (!user) return <p>Veuillez vous connecter</p>;

    return (
        <div>
            <div style={{ display: "flex", gap: "40px" }}>
                <MatriceBox title="Matrice N°1" onGenerate={setMatrice1} />
                <MatriceBox title="Matrice N°2" onGenerate={setMatrice2} />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '450px'}}>
                <SumMatrice m1={matrice1} m2={matrice2} />
                <ProdMatrice m1={matrice1} m2={matrice2} />
            </div>
        </div>
    );
}