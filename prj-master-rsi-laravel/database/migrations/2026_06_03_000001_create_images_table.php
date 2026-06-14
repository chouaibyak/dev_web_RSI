<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('images', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name');
            $blueprint->string('type');
            $blueprint->integer('size');
            $blueprint->binary('bin_img', 'longblob');
            $blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
