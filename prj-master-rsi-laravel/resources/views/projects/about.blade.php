@extends('layouts.app')

@section('content')
<div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; background: #fff;">
    <div style="display: flex; align-items: center; border-bottom: 2px solid #A1B9D5; padding-bottom: 20px; margin-bottom: 20px;">
        <div style="flex: 1;">
            <h2>{{ $user->nom }}</h2>
            <p>Étudiant en Master RSI</p>
            <p><strong>Login:</strong> {{ $user->login }}</p>
        </div>
        <div style="width: 150px; height: 150px; border: 1px solid #ccc; background: #eee; display: flex; align-items: center; justify-content: center;">
            @php
                $profileImg = \App\Models\Image::where('name', 'profile.jpg')->first();
            @endphp
            @if($profileImg)
                <img src="{{ route('images.show', $profileImg->id) }}" alt="Profile" style="max-width: 100%; max-height: 100%;">
            @else
                <span>Photo</span>
            @endif
        </div>
    </div>

    <h3>Compétences</h3>
    <ul>
        <li>Laravel / PHP</li>
        <li>JavaScript / CSS</li>
        <li>Administration Systèmes & Réseaux</li>
    </ul>

    <h3>Formation</h3>
    <p>Master Réseaux et Systèmes Informatiques (RSI)</p>
</div>
@endsection
