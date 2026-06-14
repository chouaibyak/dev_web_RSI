@extends('layouts.app')

@section('content')
<h2>Quiz 2 : PHP</h2>
<div id="quiz-container" style="padding: 20px; border: 1px solid #ccc; background: #fff;">
    <div class="question">
        <p>1. Quelle fonction permet de démarrer une session ?</p>
        <input type="radio" name="q1" value="10"> session_start()<br>
        <input type="radio" name="q1" value="0"> start_session()<br>
        <input type="radio" name="q1" value="0"> session_begin()<br>
    </div>
    <br>
    <div class="question">
        <p>2. Quel est le symbole des variables en PHP ?</p>
        <input type="radio" name="q2" value="0"> #<br>
        <input type="radio" name="q2" value="10"> $<br>
        <input type="radio" name="q2" value="0"> @<br>
    </div>
    <br>
    <button onclick="submitQuiz()">Valider</button>
</div>

<script>
    function submitQuiz() {
        let score = 0;
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');

        if (!q1 || !q2) {
            alert("Veuillez répondre à toutes les questions !");
            return;
        }

        score = parseInt(q1.value) + parseInt(q2.value);
        alert("Votre note : " + score + " / 20");

        // Save to DB
        fetch("{{ route('quiz.save') }}", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": "{{ csrf_token() }}"
            },
            body: JSON.stringify({ score: score, type: 'php' })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                window.location.href = "{{ route('projects') }}";
            }
        });
    }
</script>
@endsection
