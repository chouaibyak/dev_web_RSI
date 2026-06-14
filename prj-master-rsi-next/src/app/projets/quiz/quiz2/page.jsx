'use client'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';

export default function Quiz2Page() {
    const { user } = useAuth();
    const [rep, setRep] = useState({});
    const [note, setNote] = useState(null);

    const qcm = [
        {
            question: '1. Comment commence une variable en PHP ?',
            reponses: [
                { text: "$variable", correct: true },
                { text: "var variable", correct: false },
                { text: "let variable", correct: false },
                { text: "int variable", correct: false }
            ]
        },
        {
            question: '2. Quelle fonction affiche du texte en PHP ?',
            reponses: [
                { text: "echo", correct: true },
                { text: "print()", correct: false },
                { text: "console.log()", correct: false },
                { text: "document.write()", correct: false }
            ]
        },
        {
            question: '3. Quelle est la bonne balise PHP ?',
            reponses: [
                { text: "<?php ?>", correct: true },
                { text: "<php></php>", correct: false },
                { text: "<script php>", correct: false },
                { text: "<? ?>", correct: false }
            ]
        },
        {
            question: '4. Quelle extension utilise un fichier PHP ?',
            reponses: [
                { text: ".php", correct: true },
                { text: ".html", correct: false },
                { text: ".js", correct: false },
                { text: ".css", correct: false }
            ]
        }
    ];

    const handleChange = (Index, value) =>  {
        setRep(prev => ({
            ...prev,
            [Index]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            alert("Veuillez vous connecter");
            return;
        }

        let correctCount = 0;

        qcm.forEach((q, index)=>{
            const selected = rep[index];

            const correct = q.reponses.find(r => r.correct);

            if(selected === correct?.text){
                correctCount++;
            }
        });

        const score = (correctCount / qcm.length) * 20;
        setNote(score);

        alert("Votre score est : " + score );

        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                id: user.id,
                note2: score,
            })
        })

        if (!response.ok) {
            const data = await response.json();
            alert("Erreur lors de l'enregistrement de la note : " + (data.error || data.message));
        }
    }

  return (
    <div>
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: '#191970'}}>Quiz 2 PHP</h1>
            <span style={{color: '#1E90FF'}}>Tester vos Connaissance en <strong>PHP</strong></span>
        </div>
        <div>
            {
                qcm.map((p, index) => (
                    <div key={index}>
                        <h2>{p.question}</h2>
                        {
                            p.reponses.map((reponse, repIndex) => (
                                <label key={repIndex} htmlFor={`choix-${index}-${repIndex}`} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                                    <input 
                                        id={`choix-${index}-${repIndex}`}
                                        type="radio" 
                                        name={`question-${index}`}
                                        onChange={() => handleChange(index, reponse.text)  }
                                    />
                                    {reponse.text}
                                </label>
                            ))
                        }
                    </div>
                ))
            }
        </div>
        <button 
            style={{padding: '10px', backgroundColor: 'blue', color: 'white', border: '0px'}}
            onClick={handleSubmit}
        >
            
            Submit result

        </button>
    </div>
  )
}
