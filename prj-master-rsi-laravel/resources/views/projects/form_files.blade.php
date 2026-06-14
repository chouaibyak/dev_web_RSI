@extends('layouts.app')

@section('content')
<h2>Formulaire & Fichiers</h2>

<div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ccc;">
    <h3>Ajouter un étudiant</h3>
    <form action="{{ route('form-files') }}" method="POST">
        @csrf
        <div style="margin-bottom: 10px;">
            <label>Nom: </label>
            <input type="text" name="nom" required>
        </div>
        <div style="margin-bottom: 10px;">
            <label>Prénom: </label>
            <input type="text" name="prenom" required>
        </div>
        <div style="margin-bottom: 10px;">
            <label>CNE: </label>
            <input type="text" name="cne" required>
        </div>
        <div style="margin-bottom: 10px;">
            <label>Note: </label>
            <input type="number" name="note" required>
        </div>
        <button type="submit">Enregistrer</button>
    </form>
</div>

<h3>Liste des étudiants (Fichier texte: master_rsi2020.txt)</h3>
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>CNE</th>
            <th>Note</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @forelse($data as $row)
        <tr>
            <td>{{ $row[1] ?? '' }}</td>
            <td>{{ $row[2] ?? '' }}</td>
            <td>{{ $row[3] ?? '' }}</td>
            <td>{{ $row[4] ?? '' }}</td>
            <td>
                <button onclick="alert('Modifier: Fonctionnalité à implémenter via rechargement du fichier')">Modifier</button>
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="5" style="text-align: center;">Aucune donnée</td>
        </tr>
        @endforelse
    </tbody>
</table>
@endsection
