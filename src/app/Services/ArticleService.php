<?php

namespace App\Services;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Revision;

class ArticleService
{
    /**
     * Submit an article for review.
     */
    public function submitArticle(Article $article): bool
    {
        if (!$this->canBeSubmitted($article)) {
            return false;
        }

        $submittedStatus = ArticleStatus::where('name', 'Submitted')->first();
        $article->update(['status_id' => $submittedStatus->id]);
        
        return true;
    }

    /**
     * Publish an article.
     */
    public function publishArticle(Article $article, int $editorId): bool
    {
        if (!$this->canBePublished($article)) {
            return false;
        }

        $publishedStatus = ArticleStatus::where('name', 'Published')->first();
        $article->update([
            'status_id' => $publishedStatus->id,
            'editor_id' => $editorId,
        ]);
        
        return true;
    }

    /**
     * Request revision for an article.
     */
    public function requestRevision(Article $article, string $comments, int $editorId): bool
    {
        if (!$this->canRequestRevision($article)) {
            return false;
        }

        $needsRevisionStatus = ArticleStatus::where('name', 'Needs Revision')->first();
        
        // Create revision record
        Revision::create([
            'article_id' => $article->id,
            'editor_id' => $editorId,
            'comments' => $comments,
        ]);

        $article->update([
            'status_id' => $needsRevisionStatus->id,
            'editor_id' => $editorId,
        ]);
        
        return true;
    }

    /**
     * Revise and resubmit an article.
     */
    public function reviseAndResubmit(Article $article): bool
    {
        if (!$this->canBeRevised($article)) {
            return false;
        }

        $submittedStatus = ArticleStatus::where('name', 'Submitted')->first();
        $article->update(['status_id' => $submittedStatus->id]);
        
        return true;
    }

    /**
     * Check if article can be submitted.
     */
    public function canBeSubmitted(Article $article): bool
    {
        return $article->isDraft();
    }

    /**
     * Check if article can be published.
     */
    public function canBePublished(Article $article): bool
    {
        return $article->isSubmitted();
    }

    /**
     * Check if article can have revision requested.
     */
    public function canRequestRevision(Article $article): bool
    {
        return $article->isSubmitted();
    }

    /**
     * Check if article can be revised.
     */
    public function canBeRevised(Article $article): bool
    {
        return $article->needsRevision();
    }

    /**
     * Check if user can edit the article.
     */
    public function canBeEditedBy(Article $article, $user): bool
    {
        return $article->writer_id === $user->id || $user->can('edit any article');
    }
}
