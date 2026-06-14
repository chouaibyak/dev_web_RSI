<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/about', [ProjectController::class, 'about'])->name('about');
    
    // Module 1: Matrices
    Route::get('/matrices', [ProjectController::class, 'matrices'])->name('matrices');
    
    // Module 2: Form & Files
    Route::get('/form-files', [ProjectController::class, 'formFiles'])->name('form-files');
    Route::post('/form-files', [ProjectController::class, 'saveFormFiles']);
    
    // Module 3: Images
    Route::get('/images', [ProjectController::class, 'images'])->name('images');
    Route::post('/images', [ProjectController::class, 'uploadImage']);
    Route::get('/images/show/{id}', [ProjectController::class, 'showImage'])->name('images.show');
    
    // Module 4: Quiz
    Route::get('/quiz1', [ProjectController::class, 'quiz1'])->name('quiz1');
    Route::get('/quiz2', [ProjectController::class, 'quiz2'])->name('quiz2');
    Route::post('/quiz/save', [ProjectController::class, 'saveQuizScore'])->name('quiz.save');
    
    // Module 5: Stats
    Route::get('/stats', [ProjectController::class, 'stats'])->name('stats');
    
    // Module 6: Geolocation
    Route::get('/geo', [ProjectController::class, 'geo'])->name('geo');
});
