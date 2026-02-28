<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WriterController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ErrorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Error routes
Route::get('/error/forbidden', [ErrorController::class, 'forbidden'])->name('error.forbidden');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Writer routes - require writer role
    Route::middleware('role:writer')->prefix('writer')->name('writer.')->group(function () {
        Route::get('/dashboard', [WriterController::class, 'dashboard'])->name('dashboard');
        
        Route::prefix('articles')->name('articles.')->group(function () {
            Route::get('/create', [WriterController::class, 'create'])->name('create');
            Route::post('/', [WriterController::class, 'store'])->name('store');
            Route::get('/{article}/edit', [WriterController::class, 'edit'])->name('edit');
            Route::put('/{article}', [WriterController::class, 'update'])->name('update');
            Route::post('/{article}/submit', [WriterController::class, 'submit'])->name('submit');
            Route::post('/{article}/revise', [WriterController::class, 'revise'])->name('revise');
            Route::get('/{article}/revisions', [WriterController::class, 'revisions'])->name('revisions');
        });
    });

    // Editor routes - require editor role
    Route::middleware('role:editor')->prefix('editor')->name('editor.')->group(function () {
        Route::get('/dashboard', [EditorController::class, 'dashboard'])->name('dashboard');
        
        Route::prefix('articles')->name('articles.')->group(function () {
            Route::get('/{article}/review', [EditorController::class, 'review'])->name('review');
            Route::get('/{article}/revision', [EditorController::class, 'revision'])->name('revision');
            Route::post('/{article}/publish', [EditorController::class, 'publish'])->name('publish');
            Route::post('/{article}/request-revision', [EditorController::class, 'requestRevision'])->name('request-revision');
            Route::get('/{article}/edit', [EditorController::class, 'edit'])->name('edit');
            Route::put('/{article}/update', [EditorController::class, 'update'])->name('update');
            Route::get('/{article}/revisions', [EditorController::class, 'revisions'])->name('revisions');
        });
    });

    // Student routes - require student role
    Route::middleware('role:student')->prefix('student')->name('student.')->group(function () {
        Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('dashboard');
        
        Route::prefix('articles')->name('articles.')->group(function () {
            Route::get('/{article}', [StudentController::class, 'show'])->name('show');
            Route::post('/{article}/comment', [StudentController::class, 'comment'])->name('comment');
        });
        
        Route::get('/search', [StudentController::class, 'search'])->name('search');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/sample.php';
