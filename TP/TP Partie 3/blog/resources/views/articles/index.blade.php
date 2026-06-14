<!DOCTYPE html>
<html>
<head>
    <title>Mes articles</title>
</head>
<body>

<h1>Mes articles</h1>

<p>
    <a href="{{ route('articles.create') }}">Creer un article</a>
</p>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

@if($articles->isEmpty())
    <p>Aucun article pour le moment.</p>
@else
    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
            <tr>
                <th>Titre</th>
                <th>Contenu</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($articles as $article)
                <tr>
                    <td>{{ $article->titre }}</td>
                    <td>{{ $article->contenu }}</td>
                    <td>{{ $article->created_at->format('d/m/Y H:i') }}</td>
                    <td>
                        <a href="{{ route('articles.edit', $article) }}">Modifier</a>

                        <form method="POST" action="{{ route('articles.destroy', $article) }}" style="display:inline">
                            @csrf
                            @method('DELETE')

                            <button type="submit" onclick="return confirm('Supprimer cet article ?')">
                                Supprimer
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endif

</body>
</html>
