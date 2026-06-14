'use client'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';

export default function Quiz1Page() {
    const { user } = useAuth();
    const [rep, setRep] = useState({});
    const [note, setNote] = useState(null);

    const qcm = [
        {
            question: '1. Dans quel element on met le code js ?', 
            reponses: [ 
                {text : "<script>", correct: true}, 
                {text : "js", correct: false}, 
                {text : "<body>", correct: false}, 
                {text : "<link>", correct: false}
            ]  
        },
        {
            question: '2. Comment déclare-t-on une variable en JavaScript ?',
            reponses: [
                { text: "var x = 5;", correct: true },
                { text: "int x = 5;", correct: false },
                { text: "x := 5;", correct: false },
                { text: "let x : 5;", correct: false }
            ]
        },
        {
            question: '3. Quelle méthode permet d\'afficher un message dans la console ?',
            reponses: [
                { text: "console.log()", correct: true },
                { text: "print()", correct: false },
                { text: "echo()", correct: false },
                { text: "write()", correct: false }
            ]
        },
            
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
                note1: score,
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
            <h1 style={{color: '#191970'}}>Quiz 1 Javascript</h1>
            <span style={{color: '#1E90FF'}}>Tester vos Connaissance en Javascript</span>
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
