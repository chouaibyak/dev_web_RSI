<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Etudiant extends Authenticatable
{
    protected $table = 'etudiants';

    protected $fillable = [
        'login', 'pass', 'nom', 'note1', 'note2', 'moyenne', 'longitude', 'latitude'
    ];

    protected $hidden = [
        'pass',
    ];

    public function getAuthPassword()
    {
        return $this->pass;
    }
}
