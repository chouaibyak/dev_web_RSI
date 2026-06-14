<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        return view('projects.index');
    }

    public function about()
    {
        $user = Auth::user();
        return view('projects.about', compact('user'));
    }

    // Module 1: Matrices
    public function matrices()
    {
        return view('projects.matrices');
    }

    // Module 2: Form & Files
    public function formFiles()
    {
        $filePath = 'master_rsi2020.txt';
        $data = [];
        if (Storage::exists($filePath)) {
            $content = Storage::get($filePath);
            $lines = explode("\n", trim($content));
            foreach ($lines as $index => $line) {
                if (!empty($line)) {
                    $data[] = array_merge(['id' => $index], explode('|', $line));
                }
            }
        }
        return view('projects.form_files', compact('data'));
    }

    public function saveFormFiles(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'cne' => 'required',
            'note' => 'required|numeric',
        ]);

        $line = implode('|', $validated);
        Storage::append('master_rsi2020.txt', $line);

        return redirect()->route('form-files')->with('success', 'Données enregistrées dans le fichier.');
    }

    // Module 3: Images
    public function images()
    {
        $images = Image::all();
        return view('projects.images', compact('images'));
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $file = $request->file('image');
        $imgData = file_get_contents($file->getRealPath());

        Image::create([
            'name' => $file->getClientOriginalName(),
            'type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
            'bin_img' => $imgData,
        ]);

        return redirect()->route('images')->with('success', 'Image uploadée avec succès.');
    }

    public function showImage($id)
    {
        $image = Image::findOrFail($id);
        return response($image->bin_img)->header('Content-Type', $image->type);
    }

    // Module 4: Quiz
    public function quiz1()
    {
        return view('projects.quiz1');
    }

    public function quiz2()
    {
        return view('projects.quiz2');
    }

    public function saveQuizScore(Request $request)
    {
        $user = Auth::user();
        $score = $request->input('score');
        $quizType = $request->input('type');

        if ($quizType == 'js') {
            $user->note1 = $score;
        } else {
            $user->note2 = $score;
        }
        
        $user->moyenne = ($user->note1 + $user->note2) / 2;
        $user->save();

        return response()->json(['success' => true]);
    }

    // Module 5: Stats
    public function stats()
    {
        $etudiants = Etudiant::all();
        return view('projects.stats', compact('etudiants'));
    }

    // Module 6: Geolocation
    public function geo()
    {
        $etudiants = Etudiant::whereNotNull('latitude')->whereNotNull('longitude')->get();
        return view('projects.geo', compact('etudiants'));
    }
}
