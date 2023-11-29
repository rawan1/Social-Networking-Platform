<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommentsService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CommentRequest;

class CommentsController extends Controller
{
    /**
     * @var commentsService
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
        return $this->successResponse([], 'Added successfully', 204);
    }
}
