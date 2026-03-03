<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
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
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/api/latest-articles', function () {
    $articles = \App\Models\Article::with(['writer', 'category'])
        ->where('status', 'published')
        ->orderBy('updated_at', 'desc')
        ->take(10)
        ->get()
        ->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'excerpt' => substr($article->content ?? '', 0, 150) . '...',
                'writer' => $article->writer ? $article->writer->name : 'Unknown',
                'category' => $article->category ? $article->category->name : 'General',
                'comment_count' => $article->comments()->count(),
                'updated_at' => $article->updated_at->format('M d, Y')
            ];
        });
    
    return response()->json($articles);
});

Route::get('/student/dashboard', function () {
    return Inertia::render('Student/Dashboard');
})->middleware(['auth', 'verified', 'role:student'])->name('student.dashboard');

Route::get('/student/my-comments', [StudentController::class, 'myComments'])
    ->middleware(['auth', 'verified', 'role:student'])
    ->name('student.my.comments');

Route::get('/student/articles/{article}', [StudentController::class, 'show'])
    ->middleware(['auth', 'verified', 'role:student'])
    ->name('student.articles.show');

Route::get('/writer/dashboard', function () {
    return Inertia::render('Writer/Dashboard');
})->middleware(['auth', 'verified', 'role:writer'])->name('writer.dashboard');

Route::get('/editor/dashboard', function () {
    return Inertia::render('Editor/Dashboard');
})->middleware(['auth', 'verified', 'role:editor'])->name('editor.dashboard');

// API routes for articles and comments
Route::middleware('auth')->group(function () {
    // Article comments API
    Route::get('/api/articles/{article}/comments', function ($article) {
        $comments = \App\Models\Comment::where('article_id', $article)
            ->with('student')
            ->latest()
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'student' => [
                        'name' => $comment->student?->name
                    ],
                    'created_at' => $comment->created_at
                ];
            });
        
        return response()->json($comments);
    });

    Route::post('/api/articles/{article}/comments', function ($article) {
        $validated = request()->validate([
            'content' => 'required|string|max:1000'
        ]);

        $comment = \App\Models\Comment::create([
            'content' => $validated['content'],
            'article_id' => $article,
            'student_id' => auth()->id()
        ]);

        $comment->load('student');

        return response()->json([
            'id' => $comment->id,
            'content' => $comment->content,
            'student' => [
                'name' => $comment->student?->name
            ],
            'created_at' => $comment->created_at
        ]);
    });
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/sample.php';