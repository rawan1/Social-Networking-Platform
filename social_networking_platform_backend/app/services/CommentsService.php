<?php

namespace App\Services;
use Illuminate\Support\Collection;
use App\Models\Post;
use App\Models\Comment;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;


class CommentsService
{

    public function addComment(Request $request, $postId) {
        $post = Post::find($postId);
        if($post->exists()) {
            $comment = new Comment();
            $comment->text = $request->get('text');
            $comment->user_id = 1;


            $post->comments()->save($comment);
            // Auth::user()->comments()->save($comment);
            // $comment -> save();

        }
    } 
    public function show_comments($postId) {
        $post = Post::find($postId);
        if($post->exists()) {
            $comments = $post->comments->load('user');
            return $comments->map(function ($user) {
                return $user->only(['id', 'text', 'post_id', 'created_at', 'user']);
            });
        }
    }
}
?>