<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommentsService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CommentRequest;
use App\Notifications\postReactNotification;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    /**
     * @var commentsService
     * @var changeDetect
     */
    private CommentsService $commentsService;


    /**
     * CommentsController constructor.
     * @param commentsService $CommentsService
     */
    public function __construct(CommentsService $commentsService)
    {
        $this->commentsService = $commentsService;
    }

    public function showComments(int $postId) {
        return $this->commentsService->show_comments($postId);
    }

    public function addComment(CommentRequest $request,int $postId) {
        $this->commentsService->addComment($request, $postId);
        $notifyTo = Post::find($postId)->user;
        $notifyTo->notify(new postReactNotification(Auth::user()));
        
        return $this->successResponse([], 'Added successfully', 204);
    }
}
