<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant;
use Illuminate\Support\Facades\Hash;

class EtudiantSeeder extends Seeder
{
    public function run(): void
    {
        Etudiant::create([
            'login' => 'admin',
            'pass' => Hash::make('admin123'),
            'nom' => 'Administrateur',
            'note1' => 15,
            'note2' => 17,
            'moyenne' => 16.0,
            'longitude' => -6.8498,
            'latitude' => 33.9716,
        ]);

        Etudiant::create([
            'login' => 'ahmed',
            'pass' => Hash::make('ahmed123'),
            'nom' => 'Ahmed',
            'note1' => 12,
            'note2' => 14,
            'moyenne' => 13.0,
            'longitude' => -7.6331,
            'latitude' => 33.5731,
        ]);
        
        Etudiant::create([
            'login' => 'sara',
            'pass' => Hash::make('sara123'),
            'nom' => 'Sara',
            'note1' => 18,
            'note2' => 19,
            'moyenne' => 18.5,
            'longitude' => -5.8339,
            'latitude' => 35.7595,
        ]);
    }
}
