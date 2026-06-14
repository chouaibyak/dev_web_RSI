<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('etudiants', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('login', 20)->unique();
            $blueprint->string('pass', 256);
            $blueprint->string('nom', 20);
            $blueprint->integer('note1')->nullable();
            $blueprint->integer('note2')->nullable();
            $blueprint->float('moyenne')->nullable();
            $blueprint->float('longitude')->nullable();
            $blueprint->float('latitude')->nullable();
            $blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
