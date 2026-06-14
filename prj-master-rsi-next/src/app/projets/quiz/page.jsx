'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function QuizPage() {
  const router = useRouter();
  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '200px' ,backgroundColor: '#6495ED', padding: "20px", borderRadius: '10px'}}>
        <div>
            <h2>Quizz : N°1</h2>
            <img 
                src="/webdev.png" 
                alt="web developpement" 
                width={'348px'}
                style={{cursor: 'pointer'}}
                onClick={()=> {router.push('/projets/quiz/quiz1')}}
                />
        </div>
        <div>
            <h2>Quizz : N°2</h2>
            <img 
                src="/data.png" 
                alt="data"
                width={'348px'} 
                style={{cursor: 'pointer'}}
                onClick={() => {router.push('/projets/quiz/quiz2')}}
                />
        </div>
    </div>
  )
}
