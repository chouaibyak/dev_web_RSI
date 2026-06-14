<!DOCTYPE html>
<html>
<head>
    <title>Creer Article</title>
</head>
<body>

<h1>Creer un article</h1>

<p>
    <a href="{{ route('articles.index') }}">Voir mes articles</a>
</p>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

<form method="POST" action="{{ route('articles.store') }}">
    @csrf

    <input type="text" name="titre" placeholder="Titre" value="{{ old('titre') }}"><br>
    @error('titre')
        <p style="color:red">{{ $message }}</p>
    @enderror
    <br>

    <textarea name="contenu" placeholder="Contenu">{{ old('contenu') }}</textarea><br>
    @error('contenu')
        <p style="color:red">{{ $message }}</p>
    @enderror
    <br>

    <button type="submit">Enregistrer</button>
</form>

</body>
</html>
