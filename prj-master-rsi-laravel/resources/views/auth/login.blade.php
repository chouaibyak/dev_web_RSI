@extends('layouts.app')

@section('content')
<div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; background: #fff;">
    <h2 style="text-align: center;">Connexion</h2>
    <form action="{{ route('login.submit') }}" method="POST">
        @csrf
        <div style="margin-bottom: 15px;">
            <label for="login">Login :</label>
            <input type="text" name="login" id="login" required style="width: 100%; padding: 8px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="pass">Mot de passe :</label>
            <input type="password" name="pass" id="pass" required style="width: 100%; padding: 8px;">
        </div>
        @if ($errors->any())
            <div style="color: red; margin-bottom: 15px;">
                {{ $errors->first() }}
            </div>
        @endif
        <button type="submit" style="width: 100%; padding: 10px; background-color: #A1B9D5; border: none; font-weight: bold; cursor: pointer;">Se connecter</button>
    </form>
</div>
@endsection
