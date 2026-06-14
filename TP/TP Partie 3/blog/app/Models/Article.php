<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'titre',
        'contenu',
        'publie',
        'user_id',
    ];

    protected $casts = [
        'publie' => 'boolean',
    ];

    //relation : article appartient à un user
    public function user()
    {
        return $this->belongsTo(User::class);
    } 
}
