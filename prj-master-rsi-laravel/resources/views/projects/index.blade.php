@extends('layouts.app')

@section('content')
<h2>Bienvenue, {{ Auth::user()->nom }} !</h2>
<p>Choisissez un module dans le menu latéral ou ci-dessous :</p>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
    <a href="{{ route('matrices') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>1. Matrices (JS)</strong>
    </a>
    <a href="{{ route('form-files') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>2. Formulaire & Fichiers</strong>
    </a>
    <a href="{{ route('images') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>3. Gestion d'images</strong>
    </a>
    <a href="{{ route('quiz1') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>4. Quiz 1 (JS)</strong>
    </a>
    <a href="{{ route('quiz2') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>5. Quiz 2 (PHP)</strong>
    </a>
    <a href="{{ route('stats') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>6. Statistiques</strong>
    </a>
    <a href="{{ route('geo') }}" style="padding: 20px; border: 1px solid #A1B9D5; text-decoration: none; color: #333; text-align: center; background: #f9f9f9;">
        <strong>7. Géolocalisation</strong>
    </a>
</div>
@endsection
