<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return view('articles.index', compact('articles'));
    }

    public function create()
    {
        return view('articles.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|max:255',
            'contenu' => 'required',
        ]);

        Article::create([
            'titre' => $request->titre,
            'contenu' => $request->contenu,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('articles.index')->with('success', 'Article ajoute avec succes !');
    }

    public function edit(Request $request, Article $article)
    {
        $this->ensureOwner($request, $article);

        return view('articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $this->ensureOwner($request, $article);

        $request->validate([
            'titre' => 'required|max:255',
            'contenu' => 'required',
        ]);

        $article->update([
            'titre' => $request->titre,
            'contenu' => $request->contenu,
        ]);

        return redirect()->route('articles.index')->with('success', 'Article modifie avec succes !');
    }

    public function destroy(Request $request, Article $article)
    {
        $this->ensureOwner($request, $article);

        $article->delete();

        return redirect()->route('articles.index')->with('success', 'Article supprime avec succes !');
    }

    private function ensureOwner(Request $request, Article $article): void
    {
        abort_unless($article->user_id === $request->user()->id, 403);
    }
}
