<!DOCTYPE html>
<html>
<head>
    <title>Modifier Article</title>
</head>
<body>

<h1>Modifier un article</h1>

<p>
    <a href="{{ route('articles.index') }}">Retour aux articles</a>
</p>

<form method="POST" action="{{ route('articles.update', $article) }}">
    @csrf
    @method('PUT')

    <input type="text" name="titre" placeholder="Titre" value="{{ old('titre', $article->titre) }}"><br>
    @error('titre')
        <p style="color:red">{{ $message }}</p>
    @enderror
    <br>

    <textarea name="contenu" placeholder="Contenu">{{ old('contenu', $article->contenu) }}</textarea><br>
    @error('contenu')
        <p style="color:red">{{ $message }}</p>
    @enderror
    <br>

    <button type="submit">Modifier</button>
</form>

</body>
</html>
